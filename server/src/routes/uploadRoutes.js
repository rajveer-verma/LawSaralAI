import express from "express";
import upload from "../config/multer.js";

import {
  uploadDocument,
  getUserDocuments,
  getSingleDocument,
  deleteDocument,
} from "../controllers/uploadController.js";

const router = express.Router();

// ======================================
// Upload Document
// ======================================

router.post(
  "/",
  upload.single("document"),
  uploadDocument
);

// ======================================
// Get Upload History
// ======================================

router.get(
  "/history/:firebaseUid",
  getUserDocuments
);

// ======================================
// Get Single Document
// ======================================

router.get(
  "/document/:documentId",
  getSingleDocument
);

// ======================================
// Delete Document
// ======================================

router.delete(
  "/:documentId",
  deleteDocument
);

export default router;