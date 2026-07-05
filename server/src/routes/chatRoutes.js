import express from "express";

import {
  chatWithDocument,
  getDocumentChatHistory,
  generalChat,
  getGeneralChatHistory,
} from "../controllers/chatController.js";

const router = express.Router();

// ======================================
// Document Chat
// ======================================

router.post(
  "/document",
  chatWithDocument
);

// ======================================
// Document Chat History
// ======================================

router.get(
  "/history/:documentId",
  getDocumentChatHistory
);

// ======================================
// General Legal AI Chat
// ======================================

router.post(
  "/general",
  generalChat
);

// ======================================
// General AI Chat History
// ======================================

router.get(
  "/general/history/:firebaseUid",
  getGeneralChatHistory
);

export default router;