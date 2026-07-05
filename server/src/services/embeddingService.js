import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is missing in .env"
  );
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ======================================
// Create Embedding
// ======================================

export const createEmbedding = async (text) => {

  if (!text || !text.trim()) {
    throw new Error(
      "Cannot generate embedding for empty text."
    );
  }

  const MAX_RETRIES = 3;

  for (
    let attempt = 1;
    attempt <= MAX_RETRIES;
    attempt++
  ) {

    try {

      const result =
        await ai.models.embedContent({
          model: "gemini-embedding-001",
          contents: text,
        });

      if (
        !result.embeddings ||
        result.embeddings.length === 0 ||
        !result.embeddings[0].values
      ) {
        throw new Error(
          "Gemini returned an invalid embedding."
        );
      }

      return result.embeddings[0].values;

    } catch (error) {

      const status =
        error?.status ||
        error?.error?.code;

      if (
        (status === 503 || status === 429) &&
        attempt < MAX_RETRIES
      ) {

        const delay = attempt * 3000;

        console.log(
          `Embedding retry ${attempt}/${MAX_RETRIES} after ${delay}ms`
        );

        await sleep(delay);

        continue;

      }

      console.error(
        "Embedding Error:",
        error
      );

      throw new Error(
        error.message ||
        "Failed to generate embedding."
      );

    }

  }

};