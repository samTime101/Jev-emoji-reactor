import axios from "axios";
import type {EmojiResult } from "../types/emoji";
const apiUrl = import.meta.env.VITE_API_URL

export const predictEmoji = async (text: string): Promise<EmojiResult> => {
  try {
    const response = await axios.post<EmojiResult>(apiUrl,{ text });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail ||"unable to connect to backend", { cause: error });
    }

    throw new Error("Something went wrong.", { cause: error });
  }
};