from fastapi import FastAPI, Cookie, HTTPException
import requests, pdfplumber
from io import BytesIO 
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer
from google import genai
from pinecone import Pinecone, ServerlessSpec
import os
import uuid
from dotenv import load_dotenv
import re

load_dotenv()

model = SentenceTransformer("all-MiniLM-L6-v2")
client = genai.Client()

PC_INDEX_NAME = "doc-query"
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
if not pc.has_index(PC_INDEX_NAME):
    pc.create_index(
        name=PC_INDEX_NAME,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
PINECONE_INDEX = pc.Index(PC_INDEX_NAME)
print("Pinecone index is ready to use.")

app = FastAPI()

# RAG PIPELINE:
# PDF/HTML -> TEXT CONTENT -> CHUNKS OF TEXT -> EMBEDDINGS -> VECTOR DB

@app.get('/')
def root():
    return {"message": "Server is up and running!"}

def find_similar(user_id:str, conversation_id:str, query:str):
    query_vector = model.encode(query).tolist()
    res = PINECONE_INDEX.query(
        namespace=f"{user_id}:{conversation_id}",
        vector=query_vector, 
        top_k=1,
        include_metadata=True,
        include_values=False,
    )

    # THRESHOLD = 0.7

    # matches = []
    # for match in res.matches:
    #     if match.score >= THRESHOLD:
    #         matches.append(match)

    # return matches
    return res

def chunk_text(text:str, chunk_size:int, overlap:int) -> list[str]:
    chunks: list[str] = []
    stride = chunk_size - overlap
    curr_idx = 0

    while curr_idx < len(text):
        chunk = text[curr_idx:curr_idx + chunk_size]
        chunks.append(chunk)
        curr_idx += stride
    
    return chunks

def process_pdf_content(url:str, conversation_id:str, user_id:str, curr_pdf_num:int, file_name:str) -> None: 
    response = requests.get(url)
    response.raise_for_status()
    text = ""
    with pdfplumber.open(BytesIO(response.content)) as pdf:
        for page in pdf.pages:
           text += page.extract_text() or ""

    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    embeddings = model.encode(chunks).tolist()
    try:            
        vectors = []
        for index, embed in enumerate(embeddings):
            vectors.append({
                "id": f"pdf{curr_pdf_num}_c{conversation_id}_{uuid.uuid4().hex[:8]}",
                "values": embed,
                "metadata": {
                    "chunk_text": chunks[index],
                    "conversation_id": conversation_id,
                    "user_id": user_id,
                    "chunk_idx": index,
                    "pdf_num": curr_pdf_num,
                    "file_name": file_name
                }
            })

        PINECONE_INDEX.upsert(
            vectors=vectors,
            namespace=f"{user_id}:{conversation_id}"
        )
        print(f"Successfully upserted {len(vectors)} chunks from PDF {curr_pdf_num} into Pinecone.")
    except Exception as e:
        print("There was a problem upserting to Pinecone:", e)

class ProcessPDFRequest(BaseModel):
    urls: List[str]
    conversationID: str
    userID: str
    fileNames: List[str]

class UserQueryRequest(BaseModel):
    user_id: str
    query: str

@app.post('/process-pdfs')
def process_pdfs(payload: ProcessPDFRequest):
    PDFs = payload.urls
    curr_pdf_num = 1
    print('Processing...')
    for index, url in enumerate(PDFs):
        if requests.get(url).status_code == 200:
            process_pdf_content(url, payload.conversationID, payload.userID, curr_pdf_num, payload.fileNames[index])
            curr_pdf_num += 1
        else:
            print(f"Failed to access PDF at URL: {url}")
    return {"message": "PDF URLs processed successfully."}

def is_likely_question(query:str) -> bool:
    # add valid python regex to check if the query contains common question words or ends with a question mark

    return re.search(r"(\bwhat\b|\bwhy\b|\blist\b|\bexplain\b|\bhow\b|\bwhen\b|\bwhere\b|\bexplain\b|\btell me\b|\bcan you\b|\?)", query, re.IGNORECASE) is not None

@app.post('/user-query/{conversation_id}')
def user_query(conversation_id: str, payload: UserQueryRequest):
    user_query_text = payload.query

    if not is_likely_question(user_query_text):
        return {
            "answer": "Hello! I'm Docent, your AI assistant. Ask a question about your uploaded documents and I'll help you find relevant information."
        }

    chunks = find_similar(payload.user_id, conversation_id, user_query_text)

    res_text_chunk = ""
    res_file_name = ""
    chunk_reference: list[dict] = []

    GEMINI_PROMPT = ""

    if chunks and getattr(chunks, "matches", None):
        # take top match
        top_match = chunks.matches[0]
        metadata = getattr(top_match, "metadata", {})

        res_text_chunk = metadata.get("chunk_text", "")
        res_file_name = metadata.get("file_name", "")

        chunk_reference.append({
            "id": f"{res_file_name}_{metadata.get('chunk_idx', 0)}",
            "text": res_text_chunk
        })

        GEMINI_PROMPT = f"""
            You are Docent, an AI assistant that answers strictly based on the user's uploaded documents.

            User question:
            {user_query_text}

            Retrieved document chunk:
            {res_text_chunk}

            Rules:
            1. Answer ONLY using the provided chunk.
            2. You may use simple logical reasoning to infer answers that are clearly and directly implied by the text.
            3. Do NOT require exact wording matches. Semantic equivalence and obvious implications are allowed.
            4. If the answer cannot be found OR reasonably inferred from the chunk, say: "I don't know based on the provided documents."
            5. Do NOT use outside knowledge.
            6. Do NOT acknowledge you're using chunks to answer. Just answer the question directly.
            7. If the chunk does not contain relevant info, say you couldn't find relevant information.
            8. If multiple interpretations are possible, explain the ambiguity instead of guessing.
            9. If multiple chunks conflict, mention the conflict instead of choosing one.

            Formatting Rules:
            10. Return the answer in valid HTML format ONLY.
            11. Do NOT use markdown.
            12. Do NOT include <html>, <head>, or <body> tags.
            13. Use appropriate HTML elements such as <p>, <ul>, <ol>, <li>, and <strong> for structure.
            14. You MAY use headers like <h3> or <h4> if helpful.
            15. Ensure the output is clean, properly closed, and renderable.
            
            Answer clearly and concisely.
            """
    
    else:
        res_text_chunk = "No matches found"
        res_file_name = "No matches found"

        GEMINI_PROMPT = f"""
        You are Docent, an AI assistant that answers strictly based on the user's uploaded documents.

        User question:
        {user_query_text}

        Retrieved document chunk:
        {res_text_chunk}

        Rules:
        1. If the chunk contains 'No matches found', say you couldn't find relevant information.
        2. Answer ONLY using the provided chunk as your source of truth.
        3. You may use simple, direct logical inference when the answer is clearly implied by the text.
        4. Do NOT require exact wording matches; use semantic understanding of the content.
        5. If the answer cannot be found or reasonably inferred from the chunk, say: "I don't know based on the provided documents."
        6. Do NOT use outside knowledge or assumptions beyond what is supported by the text.
        7. If the information is incomplete or ambiguous, explain what is missing instead of guessing.
        8. If the user greets you, greet them briefly and redirect them to questions about the documents.
        9. If the user asks what AI model you are, say you cannot disclose that information and redirect to document-related questions.

        Formatting Rules:
        10. Return the answer in valid HTML format ONLY.
        11. Do NOT use markdown.
        12. Do NOT include <html>, <head>, or <body> tags.
        13. Use appropriate HTML elements such as <p>, <ul>, <ol>, <li>, and <strong> for structure.
        14. You MAY use headers like <h3> or <h4> if helpful.
        15. Ensure the output is clean, properly closed, and renderable.

        Answer clearly and concisely.
        """
    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=GEMINI_PROMPT
        )

        return {
            "answer": response.text,
            "source_file": res_file_name,
            "chunk_reference": chunk_reference,
            "error": None
        }

    except Exception as e:
        print("Error generating response from Gemini:", e)
        return {
            "answer": "Sorry, I'm having trouble generating a response right now.",
            "source_file": res_file_name,
            "chunk_reference": chunk_reference,
            "error": str(e)
        }

# To run this server, use the command: uvicorn server:app --reload

# If you get a Pinecone unauthorized/malformed domain error, just restart your Python server