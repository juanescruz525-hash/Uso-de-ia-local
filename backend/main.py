from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

# Configuración de CORS para permitir peticiones desde el frontend (puerto 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica el dominio exacto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    prompt: str


@app.post("/chat")
def chat(data: Prompt):

    def stream():

        response = requests.post(
            "http://ollama:11434/api/generate",
            json={
                "model": "gemma:2b",
                "prompt": data.prompt,
                "stream": True
            },
            stream=True
        )

        for line in response.iter_lines():

            if line:

                chunk = json.loads(line)

                if "response" in chunk:
                    yield chunk["response"]

    return StreamingResponse(stream(), media_type="text/plain")
    