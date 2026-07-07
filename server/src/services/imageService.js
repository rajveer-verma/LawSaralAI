import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const extractImageText = async (
  imagePath,
  mimeType
) => {

  try {

    const imageBuffer =
      await fs.readFile(imagePath);

    const imageBase64 =
      imageBuffer.toString("base64");

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const result =
      await model.generateContent([
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType,
          },
        },

        `
You are an OCR engine.

Extract ALL readable text from this image.

Rules:

- Do NOT summarize.
- Do NOT explain.
- Do NOT translate.
- Preserve headings.
- Preserve numbering.
- Preserve paragraphs.
- Preserve tables whenever possible.
- Return only the extracted text.

If no text exists, return:

No readable text found.
        `,
      ]);

    return result.response.text().trim();

  } catch (error) {

    console.error(
      "Image OCR Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to extract text from image."
    );

  }

};