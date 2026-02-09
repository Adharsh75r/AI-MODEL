from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os


from app.services.ingestion_service import ingest_document
from app.services.rag_service import ask_question
from app.schemas.query import AskResponse
from app.schemas.query import AskRequest
from app.policy.policy_engine import evaluate_policy

app = FastAPI(title="Responsible GenAI RAG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[

        "http://localhost:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    file_path = os.path.join("data/uploads", file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    chunks = ingest_document(file_path)

    return {
        "message": "Document ingested successfully",
        "chunks_created": chunks
    }

@app.post("/ask",response_model=AskResponse)
async def ask(payload: AskRequest):
    print("Payload received:", payload.dict())
    rag_result = ask_question(payload.query)
    policy_decision = evaluate_policy(rag_result)
    
    return {
        **rag_result,
        "policy_decision": policy_decision
    }
