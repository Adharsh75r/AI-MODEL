import os
from langchain_community.vectorstores import FAISS
from langchain.embeddings import SentenceTransformerEmbeddings


DB_PATH = "app/vectorstore/faiss_index"

embedding_model = SentenceTransformerEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

def save_vector_store(docs):
    db = FAISS.from_documents(docs, embedding_model)
    os.makedirs(DB_PATH, exist_ok=True)
    db.save_local(DB_PATH)
    return db

def load_vector_store():
    if not os.path.exists(DB_PATH):
        return None
    return FAISS.load_local(
    DB_PATH,
    embedding_model,
    allow_dangerous_deserialization=True
)

