from typing import List, Dict
from app.services.llm_service import generate_answer
from app.vectorstore.vector_store import save_vector_store, load_vector_store


def ask_question(query: str):
    vector_db = load_vector_store()
    if not vector_db:
        return {
            "answer": "No policy documents uploaded yet.",
            "confidence": 0.0,
            "risk_level": "HIGH",
            "hallucination_detected": True,
            "sources": []
        }

    retriever = vector_db.as_retriever(search_kwargs={"k": 3})
    docs = retriever.get_relevant_documents(query)

    context_text = "\n\n".join([doc.page_content for doc in docs])

    answer = generate_answer(context_text, query)


    confidence = calculate_confidence(answer,docs)
    hallucinated = detect_hallucination(answer, docs)
    risk = calculate_risk(confidence, hallucinated)

    sources = list({
        doc.metadata.get("source", "unknown")
        for doc in docs
    })

    return {
        "answer": answer,
        "confidence": confidence,
        "risk_level": risk,
        "hallucination_detected": hallucinated,
        "sources": sources
    }



def relevance_score(answer,docs):

    if not docs:
        return 0.0

    scores = []
    for doc in docs:
        score = doc.metadata.get("score")
        if score is not None:
            scores.append(score)

    if not scores:
        return min(0.8, len(docs) / 4)

    return min(1.0, sum(scores) / len(scores))


def coverage_score(docs, k=3):
    return min(1.0, len(docs) / k)


def grounding_score(answer, docs):
    if not docs:
        return 0.0

    answer_tokens = set(answer.lower().split())
    doc_tokens = set()

    for doc in docs:
        doc_tokens.update(doc.page_content.lower().split())

    overlap = answer_tokens.intersection(doc_tokens)

    return min(1.0, len(overlap) / max(10, len(answer_tokens)))



def calculate_confidence(answer,docs):
    r = relevance_score(answer,docs)
    c = coverage_score(docs)
    g = grounding_score(answer, docs)

    if g < 0.1 :
        return 0.2

    if is_explicit_uncertainty(answer):
        return round(max(0.2, g), 2)

    confidence = (0.4 * r) + (0.3 * c) + (0.3 * g)

    return round(confidence, 2)


def detect_hallucination(answer, docs):
    return len(docs) == 0 or len(answer.strip()) < 20


def calculate_risk(confidence, hallucinated):
    if hallucinated:
        return "HIGH"
    if confidence < 0.5:
        return "MEDIUM"
    return "LOW"

def is_explicit_uncertainty(answer: str) -> bool:
    patterns = [
        "i don't know",
        "not mentioned",
        "does not mention",
        "no information",
        "not provided",
        "cannot find",
        "no reference"
    ]
    answer_lower = answer.lower()
    return any(p in answer_lower for p in patterns)
