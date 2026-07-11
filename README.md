# ⚖️ LawSaral AI – AI Powered Legal Document Analyzer & Legal Assistant

<p align="center">
An AI-powered Legal Document Analyzer built using the MERN Stack, Google Gemini AI, Retrieval-Augmented Generation (RAG), Gemini Vision OCR, and Qdrant Vector Database.
</p>

---

# 📖 Overview

LawSaral AI is an AI-powered legal assistant that helps users understand legal documents quickly and efficiently.

The platform allows users to upload legal documents in **PDF** or **Image** format, generates AI-powered summaries, and answers questions based only on the uploaded document using a **Retrieval-Augmented Generation (RAG)** pipeline.

---

# ✨ Features

### 📄 AI Document Analysis
- Upload PDF legal documents
- Upload scanned legal document images (PNG/JPG/JPEG)
- AI-generated legal document summaries
- OCR-based text extraction using Gemini Vision
- Automatic document text extraction

### 🤖 Document AI Chat
- Ask questions about uploaded documents
- Context-aware AI responses
- Retrieval-Augmented Generation (RAG)
- Semantic vector search
- Hallucination-aware responses

### ⚖️ General Legal Assistant
- Ask legal questions without uploading documents
- AI-powered legal guidance in simple language
- Markdown response rendering
- Copy responses with one click

### 📚 History Management
- Upload history
- Document history
- User-specific chat history
- Delete uploaded documents

### 🔐 Authentication
- Firebase Authentication
- Secure user login
- Protected routes

---

# 📄 Supported File Formats

| Format | Supported |
|---------|-----------|
| PDF | ✅ |
| PNG | ✅ |
| JPG | ✅ |
| JPEG | ✅ |

**Maximum Upload Size:** **10 MB**

---

# 🏗 System Architecture

```text
          PDF / Image Upload
                  │
                  ▼
     PDF Extraction / Gemini Vision OCR
                  │
                  ▼
           Extracted Document Text
                  │
                  ▼
          Intelligent Text Chunking
                  │
                  ▼
      Gemini Embedding Generation
       (3072-Dimensional Vectors)
                  │
                  ▼
       Qdrant Vector Database
                  │
                  ▼
 Retrieval-Augmented Generation (RAG)
                  │
                  ▼
         Google Gemini AI
                  │
                  ▼
        AI-Generated Response
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Markdown
- React Icons

---

## Backend

- Node.js
- Express.js
- Multer
- PDF.js

---

## Database

- MongoDB Atlas
- Qdrant Vector Database

---

## Authentication

- Firebase Authentication

---

## Artificial Intelligence

- Google Gemini AI
- Gemini Vision OCR
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings

---

## ⭐ If you found this project helpful, consider giving it a Star!