import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;

// ==============================
// Upload Document
// ==============================

export const uploadDocument = (formData) =>
  API.post("/upload", formData);

// ==============================
// Document Chat
// ==============================

export const chatWithDocument = (
  question,
  documentId,
  qdrantDocumentId
) =>
  API.post("/chat/document", {
    question,
    documentId,
    qdrantDocumentId,
  });

// ==============================
// Document Chat History
// ==============================

export const getDocumentChatHistory = (
  documentId
) =>
  API.get(
    `/chat/history/${documentId}`
  );

// ==============================
// General AI Chat
// ==============================

export const chatWithAI = (
  question,
  firebaseUid
) =>
  API.post("/chat/general", {
    question,
    firebaseUid,
  });

// ==============================
// General AI Chat History
// ==============================

export const getGeneralChatHistory = (
  firebaseUid
) =>
  API.get(
    `/chat/general/history/${firebaseUid}`
  );

// ==============================
// Save Logged-in User
// ==============================

export const saveUser = (userData) =>
  API.post("/users/login", userData);

// ==============================
// Upload History
// ==============================

export const getUploadHistory = (
  firebaseUid
) =>
  API.get(
    `/upload/history/${firebaseUid}`
  );

// ==============================
// Get Single Document
// ==============================

export const getSingleDocument = (
  documentId
) =>
  API.get(
    `/upload/document/${documentId}`
  );

// ==============================
// Delete Uploaded Document
// ==============================

export const deleteDocument = (
  documentId
) =>
  API.delete(
    `/upload/${documentId}`
  );