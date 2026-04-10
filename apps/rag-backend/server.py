from fastapi import FastAPI
import requests, pdfplumber
from io import BytesIO 
from pydantic import BaseModel
from typing import List

app = FastAPI()

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

def get_pdf_content(url:str): 
    response = requests.get(url)
    response.raise_for_status()
    text = ""
    with pdfplumber.open(BytesIO(response.content)) as pdf:
        for page in pdf.pages:
           text += page.extract_text() or ""
    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    print(chunks)

class ProcessPDFRequest(BaseModel):
    urls: List[str]
    conversationID: str
    userID: str

@app.post('/process-pdfs')
def process_pdfs(payload: ProcessPDFRequest):
    for url in payload.urls:
        if requests.get(url).status_code == 200:
            text_content = get_pdf_content(url)
        else:
            print(f"Failed to access PDF at URL: {url}")
    return {"message": "PDF URLs processed successfully."}

# To run this server, use the command: uvicorn server:app --reload
