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

def find_similiar(user_id:str, conversation_id:str):
    print('Finding similar chunks in Pinecone for user_id:', user_id)
    test_question = "What stage is AI currently in?"
    query_vector = model.encode(test_question).tolist()
    res = PINECONE_INDEX.query(
        namespace=f"{user_id}:{conversation_id}",
        vector=query_vector, 
        top_k=3,
        include_metadata=True,
        include_values=False,
    )

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

        print(f"Upserted {len(vectors)} chunks successfully")
        find_similiar(user_id, conversation_id)
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
    file_names: List[str]

@app.post('/process-pdfs')
def process_pdfs(payload: ProcessPDFRequest):
    PDFs = payload.urls
    curr_pdf_num = 1
    print(PDFs, payload.file_names)
    print('Processing...')
    for index, url in enumerate(PDFs):
        if requests.get(url).status_code == 200:
            process_pdf_content(url, payload.conversationID, payload.userID, curr_pdf_num, payload.file_names[index])
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
