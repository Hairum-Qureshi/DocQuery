from fastapi import FastAPI
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

load_dotenv()

model = SentenceTransformer("all-MiniLM-L6-v2")
client = genai.Client()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
pc.create_index(
    name="doc-query",
    dimension=384,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)
PINECONE_INDEX = pc.Index("doc-query")

app = FastAPI()

# RAG PIPELINE:
# PDF/HTML -> TEXT CONTENT -> CHUNKS OF TEXT -> EMBEDDINGS -> VECTOR DB

@app.get('/')
def root():
    return {"message": "Server is up and running!"}

def chunk_text(text:str, chunk_size:int, overlap:int) -> list[str]:
    chunks: list[str] = []
    stride = chunk_size - overlap
    curr_idx = 0

    while curr_idx < len(text):
        chunk = text[curr_idx:curr_idx + chunk_size]
        chunks.append(chunk)
        curr_idx += stride
    
    return chunks

def get_pdf_content(url:str, conversation_id:str, user_id:str, curr_pdf_num:int) -> None: 
    response = requests.get(url)
    response.raise_for_status()
    text = ""
    with pdfplumber.open(BytesIO(response.content)) as pdf:
        for page in pdf.pages:
           text += page.extract_text() or ""

    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    embeddings = model.encode(chunks)
    try:
        for index, embed in enumerate(embeddings):
            PINECONE_INDEX.upsert(
            vectors=[
                {
                    "id": f"pdf{curr_pdf_num}_c{conversation_id}_{uuid.uuid4().hex[:8]}",
                    "values": embed,
                    "metadata": {
                        "chunk_text": chunks[index],
                        "conversation_id": conversation_id,
                        "user_id": user_id,
                        "chunk_idx": index,
                        "pdf_num": curr_pdf_num
                    }
                }
            ]
        )
        print("Successfully upserted chunk index", index, "to Pinecone.")
    except Exception as e:
        print("There was a problem upserting to Pinecone:", e)
    # test = "What stage is AI currently in?"
    # test_embed = model.encode(test)

    # similarities = model.similarity(test_embed, embeddings)
    # best_idx = similarities.argmax()

    # try:
    #     response = client.models.generate_content(
    #         model="gemini-3-flash-preview", contents=f"here is the user's question: {test} and here is the most relevant chunk of text from the PDF: {chunks[best_idx]}. Use the chunk of text to answer the user's question as best as you can. If you don't know the answer, say you don't know."
    #     )

    #     print("AI RESPONSE:", response.text)
    #     print('chunk used: ', chunks[best_idx])
    # except Exception as e:
    #     print("Error generating response from Gemini:", e)

class ProcessPDFRequest(BaseModel):
    urls: List[str]
    conversationID: str
    userID: str

@app.post('/process-pdfs')
def process_pdfs(payload: ProcessPDFRequest):
    PDFs = payload.urls
    num_pdfs = len(PDFs)
    curr_pdf_num = 1
    for url in PDFs:
        if requests.get(url).status_code == 200:
            text_content = get_pdf_content(url, payload.conversationID, payload.userID, curr_pdf_num)
            curr_pdf_num += 1
        else:
            print(f"Failed to access PDF at URL: {url}")
    return {"message": "PDF URLs processed successfully."}

# @app.post('/user-query')
# def user_query(query:str):
#     # This is where the RAG pipeline would be executed in a real implementation
#     # For demonstration, we'll just return the query and a placeholder response
#     return {
#         "query": query,
#         "response": "This is where the AI-generated response would go based on the retrieved information from the PDFs."
#     }

# To run this server, use the command: uvicorn server:app --reload
