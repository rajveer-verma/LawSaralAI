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

// ======================================
// General AI Chat
// ======================================

export const askGeneralAI = async (
  question
) => {

  try {

    if (!question || !question.trim()) {
      throw new Error(
        "Question is required."
      );
    }

    const prompt = `
You are LawSaral AI, a legal assistant.

Instructions:

- Answer ONLY legal-related questions.
- Explain everything in simple and easy-to-understand language.
- Use examples whenever helpful.
- Use bullet points whenever appropriate.
- Do NOT provide false legal information.
- If the question is outside the legal domain, politely say that you can only help with legal topics.

Question:

${question}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.2,
        },
      });

    if (!response.text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    return response.text.trim();

  } catch (error) {

    console.error(
      "General Chat Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to generate response."
    );

  }

};