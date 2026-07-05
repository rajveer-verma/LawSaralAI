import fs from "fs/promises";
import { randomUUID } from "crypto";

import Document from "../models/Document.js";
import User from "../models/User.js";

import { extractPdfText } from "../services/pdfService.js";
import { generateSummary } from "../services/geminiService.js";
import { createEmbedding } from "../services/embeddingService.js";
import { storeChunks } from "../services/vectorService.js";

import { chunkText } from "../utils/chunkText.js";

import DocumentChat from "../models/DocumentChat.js";
import { deleteDocumentVectors } from "../services/vectorService.js";

// ======================================
// Upload Document
// ======================================

export const uploadDocument = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { firebaseUid } = req.body;

    if (!firebaseUid) {
      return res.status(400).json({
        success: false,
        message: "firebaseUid is required",
      });
    }

    const user = await User.findOne({
      firebaseUid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const qdrantDocumentId = randomUUID();

    const extractedText =
      await extractPdfText(req.file.path);

    if (!extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "No readable text found in the uploaded PDF.",
      });
    }

    const chunks = chunkText(extractedText);

    const embeddings = [];

    for (
      let i = 0;
      i < chunks.length;
      i++
    ) {

      const embedding =
        await createEmbedding(chunks[i]);

      embeddings.push(embedding);

      if (i !== chunks.length - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 400)
        );
      }

    }

    await storeChunks(
      qdrantDocumentId,
      req.file.originalname,
      chunks,
      embeddings
    );

    const summary =
      await generateSummary(
        extractedText
      );

    const document =
      await Document.create({
        userId: user._id,
        filename: req.file.originalname,
        summary,
        qdrantDocumentId,
      });

    return res.status(200).json({
      success: true,
      documentId: document._id,
      qdrantDocumentId,
      filename: req.file.originalname,
      totalCharacters:
        extractedText.length,
      totalChunks: chunks.length,
      summary,
    });

  } catch (error) {

    console.error(
      "Upload Controller Error:",
      error
    );

    const status =
      error.status ||
      error?.error?.code;

    if (status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "Gemini service is temporarily unavailable. Please try again after a few seconds.",
      });
    }

    if (
      error.message &&
      (
        error.message.includes("429") ||
        error.message.includes("RESOURCE_EXHAUSTED") ||
        error.message.includes("quota")
      )
    ) {
      return res.status(429).json({
        success: false,
        message:
          "Gemini API quota exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while processing the document.",
    });

  } finally {

    if (req.file) {

      try {

        await fs.unlink(req.file.path);

      } catch (err) {
        // Ignore if file is already removed
      }

    }

  }

};

// ======================================
// Get Upload History
// ======================================

export const getUserDocuments = async (
  req,
  res
) => {
  try {

    const { firebaseUid } = req.params;

    const user = await User.findOne({
      firebaseUid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const documents =
      await Document.find({
        userId: user._id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      documents,
    });

  } catch (error) {

    console.error(
      "Get Documents Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Delete Document
// ======================================

export const deleteDocument = async (
  req,
  res
) => {
  try {

    const { documentId } = req.params;

    const document =
      await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Delete vectors from Qdrant
    await deleteDocumentVectors(
      document.qdrantDocumentId
    );

    // Delete document chat history
    await DocumentChat.deleteMany({
      documentId,
    });

    // Delete document from MongoDB
    await Document.findByIdAndDelete(
      documentId
    );

    return res.status(200).json({
      success: true,
      message:
        "Document deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete Document Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Get Single Document
// ======================================

export const getSingleDocument = async (
  req,
  res
) => {
  try {

    const { documentId } = req.params;

    const document =
      await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      document,
    });

  } catch (error) {

    console.error(
      "Get Document Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};