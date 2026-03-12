from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import requests

app = FastAPI()

# carpeta de archivos estáticos
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")


class Prompt(BaseModel):
    prompt: str


@app.get("/")
def root():
    return FileResponse("frontend/index.html")


@app.post("/chat")
def chat(data: Prompt):

    try:

        response = requests.post(
            "http://ollama:11434/api/generate",
            json={
                "model": "gemma:2b",
                "prompt": data.prompt,
                "stream": False
            },
        )

        result = response.json()

        return {"response": result.get("response", "No response")}

    except Exception as e:

        return {"response": f"Error conectando con Ollama: {str(e)}"}