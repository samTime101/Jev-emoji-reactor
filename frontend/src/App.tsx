import { useState } from "react";
import { predictEmoji } from "./api/emoji";
import type { EmojiResult } from "./types/emoji";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<EmojiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (): Promise<void> => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await predictEmoji(text.trim());
      setResult(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app">
      <div className="card">
        <h1>Emoji Classifier</h1>
        <p className="subtitle">
          Enter some text and let AI choose the best emoji
        </p>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter text here..."
          rows={5}
        />
        <button onClick={handlePredict} disabled={loading || !text.trim()}>
          {loading ? "Predicting..." : "Predict Emoji"}
        </button>

        {result && (
          <div className="result">
            <h2>{result.emoji}</h2>
            <p>
              <strong>Confidence:</strong>{" "}
              {(result.confidence)}
            </p>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;