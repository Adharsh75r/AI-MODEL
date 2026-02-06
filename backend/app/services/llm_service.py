TOKEN = "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"
from groq import Groq
from typing import List, Dict



MODEL_NAME = "llama-3.1-8b-instant"
TEMPERATURE = 0.2 

SYSTEM_PROMPT = """
You are an enterprise governance assistant.
You must:
- Answer ONLY using the provided context
- Say "I don't know" if the answer is not in the context
- Avoid assumptions and speculation
- Be concise, factual, and neutral
"""


# ---- LLM Initialization ----
client = Groq(api_key=TOKEN)

# ---- Public Interface ----
def generate_answer(context: str, question: str) -> str:
    """
    Generate a grounded answer using strict system rules.
    """
    message = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role" : "user",
            "content" : f"context:\n{context}"
        },
        {
            "role" : "user",
            "content" : f"Question:\n{question}"
        }
    ]
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages= message,
        temperature=TEMPERATURE
    )


    return (completion.choices[0].message.content.strip())
