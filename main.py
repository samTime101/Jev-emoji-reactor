from emoji.main import EmojiClassifier

emojiclassifier = EmojiClassifier("Hello I am samip")
result = emojiclassifier.predict()

print("Input:", result.input)
print("Decision:", result.emoji)
print("Confidence:", result.confidence)
