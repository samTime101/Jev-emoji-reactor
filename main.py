import os
import json
from typesafe_sdk import TypeSafeClient, Choice
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class EmojiResult(BaseModel):
    input: str
    emoji: str
    confidence: float

class EmojiClassifier:
    def __init__(self,text):
        self.text = text
        self.client = TypeSafeClient(api_key=os.environ.get("TYPESAFE_API_KEY"))

    def predict(self):
        with open("emojis.json", "r", encoding="utf-8") as f:
            emojis = json.load(f)
        self.emoji_criteria = {emoji: description for emoji, description in emojis.items()}
        question = Choice(instructions="Choose the emoji that best matches the sentiment of the text.",criteria=self.emoji_criteria)
        response = self.client.system_one({"text": self.text},{"emoji": question},)
        choice = response.choices["emoji"]

        return EmojiResult(input=self.text, emoji=choice.choice, confidence=choice.confidence)

emojiclassifier = EmojiClassifier("Hello I am samip")
result = emojiclassifier.predict()

print("Input:", result.input)
print("Decision:", result.emoji)
print("Confidence:", result.confidence)
