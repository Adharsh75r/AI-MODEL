from pydantic import BaseModel
from typing import List, Dict, Any

class AskRequest(BaseModel):
    query: str

class PolicyDecision(BaseModel):
    decision: str
    reason: str
    human_review_required: bool

class AskResponse(BaseModel):
    answer: str
    confidence: float
    risk_level: str
    hallucination_detected: bool
    sources: list[str]
    policy_decision : PolicyDecision
