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
// Generate Document Summary
// ======================================

export const generateSummary = async (text) => {
  try {
    const documentText =
      text.length > 25000
        ? text.substring(0, 25000)
        : text;

    const prompt = `
You are LawSaral AI.

Analyze the following legal document and generate a well-structured response.

Return the answer in this exact format:

## 1. Simple Summary

## 2. Important Points

## 3. Parties Involved

## 4. Important Dates

## 5. Risks (if any)

## 6. Suggested Next Steps

Use simple English so that a normal person without legal knowledge can understand it.

Document:

${documentText}
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
      "Gemini Summary Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to generate summary."
    );

  }
};