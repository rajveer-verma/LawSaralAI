import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { createEmbedding } from "./embeddingService.js";
import { searchSimilarChunks } from "./vectorService.js";

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
// Ask Question from Uploaded Document
// ======================================

export const askDocument = async (
  documentId,
  question
) => {

  try {

    if (!question || !question.trim()) {
      throw new Error(
        "Question is required."
      );
    }

    const queryEmbedding =
      await createEmbedding(question);

    const results =
      await searchSimilarChunks(
        documentId,
        queryEmbedding
      );

    if (
      !results ||
      results.length === 0
    ) {
      return "I couldn't find this information in the uploaded document.";
    }

    const context = results
      .map(
        (item) =>
          item.payload?.text || ""
      )
      .join("\n\n")
      .trim();

    if (!context) {
      return "I couldn't find this information in the uploaded document.";
    }

    const prompt = `
You are LawSaral AI.

You answer questions ONLY from the uploaded document.

Rules:

- Use ONLY the document context below.
- Never use outside knowledge.
- Never guess.
- If the answer is not present in the document, reply exactly:

"I couldn't find this information in the uploaded document."

- Keep the answer simple and easy to understand.
- Use bullet points whenever appropriate.

-------------------------
Document Context:

${context}

-------------------------

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
      "RAG Service Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to answer the document question."
    );

  }

};