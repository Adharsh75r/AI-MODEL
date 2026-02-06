def evaluate_policy(rag_result:dict) -> dict:

    confidence = rag_result.get("confidence", 0.0)
    risk_level = rag_result.get("risk_level", "LOW")
    hallucination = rag_result.get("hallucination", False)


    decision = "Allow"
    reason = "Answer approved"
    human_review_required = False


    if hallucination:
        decision = "Block"
        reason = "Hallucination detected"
        human_review_required = True


    if confidence < 0.4:
        decision = "Review"
        reason = "Low confidence output"
        human_review_required = True

    if risk_level == "HIGH":
        decision = "Block"
        reason = "High risk domain"
        human_review_required = True

    return {
        "decision": decision,
        "reason": reason,
        "human_review_required": human_review_required
    }
