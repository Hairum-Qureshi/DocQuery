from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    return {"message": "Server is up and running!"}

@app.post('/process-pdfs')
def process_pdfs(urls: list[str]):
    print(urls)
    return {"message": "PDF URLs received and processed successfully!"}

# To run this server, use the command: uvicorn server:app --reload