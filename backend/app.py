from fastapi import FastAPI
from pydantic import BaseModel
from emoji.main import EmojiClassifier, EmojiResult
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"])

class PredictionRequest(BaseModel):
    text: str

@app.post("/predict", response_model=EmojiResult)
def predict(request: PredictionRequest):
    classifier = EmojiClassifier(request.text)
    return classifier.predict()