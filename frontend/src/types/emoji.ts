export interface PredictionRequest {
  text: string;
}

export interface EmojiResult {
  input: string;
  emoji: string;
  confidence: number;
}

export interface ApiError {
  error: string;
}