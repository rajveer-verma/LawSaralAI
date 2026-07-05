import { access, readFile } from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractPdfText = async (filePath) => {
  try {
    await access(filePath);

    const data = new Uint8Array(
      await readFile(filePath)
    );

    const pdf = await pdfjsLib.getDocument({
      data,
    }).promise;

    let text = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(
        pageNumber
      );

      const content =
        await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ")
        .trim();

      if (pageText) {
        text += pageText + "\n";
      }
    }

    text = text.trim();

    if (!text) {
      throw new Error(
        "No readable text found in the uploaded PDF."
      );
    }

    return text;
  } catch (error) {
    console.error(
      "PDF Extraction Error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to extract text from PDF."
    );
  }
};