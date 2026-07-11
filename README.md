# ⚖️ LawSaral AI – AI Powered Legal Document Analyzer & Legal Assistant

<p align="center">

An AI-powered Legal Document Analyzer built using the MERN Stack, Google Gemini AI, Retrieval-Augmented Generation (RAG), Gemini Vision OCR, and Qdrant Vector Database.

</p>

---

# 📖 Overview

LawSaral AI is an AI-powered legal assistant that helps users understand legal documents quickly and efficiently.

The platform allows users to upload legal documents in **PDF** or **Image** format, generates AI-powered summaries, and answers questions based only on the uploaded document using a Retrieval-Augmented Generation (RAG) pipeline.

---

# ✨ Features

### 📄 Legal Document Analysis

- Upload PDF documents
- Upload scanned legal documents
- Upload image-based legal documents
- AI-generated document summaries
- Intelligent document chunking
- Semantic document retrieval
- Context-aware document question answering

---

### 🖼 OCR Support

- Image OCR using Gemini Vision
- Supports PNG, JPG and JPEG files
- Extracts text from scanned legal documents
- Uses extracted text for AI analysis

---

### 🤖 AI Features

- Google Gemini AI
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings
- Context-aware Question Answering
- Hallucination-aware Responses

---

### 👤 User Features

- Google Authentication
- User-specific document history
- User-specific chat history
- AI-powered legal assistant
- Document-specific conversations

---

### 🎨 Frontend Features

- Responsive Design
- Mobile Friendly
- Sidebar Navigation
- Markdown Rendering
- Copy AI Responses
- Loading States
- Clean UI

---

# 🏗 System Architecture

```
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
      Retrieval-Augmented Generation
                  │
                  ▼
         Google Gemini AI Model
                  │
                  ▼
         AI Generated Response
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

# 📂 Project Structure

```
LawSaral
│
├── client
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── uploads
│   │
│   └── server.js
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/LawSaralAI.git

cd LawSaralAI
```

---

## Install Dependencies

### Frontend

```bash
cd client

npm install
```

### Backend

```bash
cd server

npm install
```

---

## Environment Setup

This project requires environment configuration files for both the frontend and backend.

For security reasons, all API keys, authentication credentials, database connections, and other sensitive configuration values have been excluded from this repository.

---

## Run Frontend

```bash
cd client

npm run dev
```

---

## Run Backend

```bash
cd server

npm start
```

---

# 📡 REST API

### Authentication

```
POST /api/users/login
```

### Upload Document

```
POST /api/upload
```

### Upload History

```
GET /api/upload/history/:firebaseUid
```

### Get Document

```
GET /api/upload/document/:documentId
```

### Delete Document

```
DELETE /api/upload/:documentId
```

### Document Chat

```
POST /api/chat/document
```

### Document Chat History

```
GET /api/chat/history/:documentId
```

### General Legal Chat

```
POST /api/chat/general
```

### General Chat History

```
GET /api/chat/general/history/:firebaseUid
```

---

# 📸 Screenshots

## Home Page

_Add screenshot_

---

## Upload Document

_Add screenshot_

---

## AI Summary

_Add screenshot_

---

## Document Chat

_Add screenshot_

---

## General Legal AI

_Add screenshot_

---

## Mobile View

_Add screenshot_

---

# 🌟 Highlights

- AI-powered Legal Document Analysis
- PDF & Image Support
- Gemini Vision OCR
- Google Gemini AI
- Retrieval-Augmented Generation (RAG)
- Qdrant Vector Database
- Semantic Search
- AI-powered Legal Assistant
- Firebase Authentication
- Responsive User Interface
- Mobile Friendly

---

# 🔮 Future Improvements

- DOCX Support
- AI Clause Detection
- Multi-language Support
- AI Risk Analysis
- Export AI Summary as PDF
- Legal Citation Support
- AI Confidence Score

---

# 👨‍💻 Author

**Rajveer Verma**

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://linkedin.com/in/YOUR_LINKEDIN

---

## ⭐ If you found this project helpful, consider giving it a Star.