# ⚖️ LawSaral AI – AI Powered Legal Document Analyzer & Legal Assistant

<p align="center">

An AI-powered Legal Document Analyzer built using the MERN Stack, Google Gemini AI, Retrieval-Augmented Generation (RAG), Gemini Vision OCR, and Qdrant Vector Database.

</p>

---

# 📖 Overview

LawSaral AI is an AI-powered legal assistant that helps users understand legal documents quickly and efficiently.

The platform allows users to upload legal documents in **PDF** or **Image** format, generates AI-powered summaries, and answers questions based only on the uploaded document using a Retrieval-Augmented Generation (RAG) pipeline.

---

## 🚀 Features

### 📄 AI Document Analysis
- Upload PDF legal documents
- Upload scanned legal document images (PNG/JPG/JPEG)
- AI-generated legal document summaries
- OCR support for image documents using Gemini Vision
- Automatic text extraction

### 🤖 Document AI Chat
- Ask questions about uploaded documents
- Context-aware AI responses
- Retrieval-Augmented Generation (RAG)
- Semantic Vector Search
- Hallucination-aware responses

### ⚖️ General Legal Assistant
- Ask legal questions without uploading documents
- Simple AI-generated explanations
- Markdown support
- Copy responses

### 📚 History Management
- Upload history
- Document history
- User-specific chat history
- Delete uploaded documents

### 🔐 Authentication
- Firebase Authentication
- Secure user login
- Protected routes

### 📱 Responsive UI
- Mobile Friendly
- Desktop Friendly
- Tablet Support

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Markdown
- React Icons
- Firebase Authentication

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- PDF.js

## AI

- Google Gemini AI
- Gemini Vision OCR
- Vector Embeddings
- Retrieval-Augmented Generation (RAG)
- Semantic Search

## Vector Database

- Qdrant

---

# ⚙️ System Architecture

```
User
   │
   ▼
React Frontend
   │
   ▼
Express API
   │
   ├── Firebase Authentication
   ├── MongoDB
   ├── PDF/Image Processing
   ├── Gemini Vision OCR
   ├── Gemini AI
   └── Qdrant Vector Database
```

---

# 📁 Project Structure

```text
LawSaral/
│
├── client/                 # React Frontend
│
├── server/
│   ├── src/
│   │   ├── config/         # Database Configuration
│   │   ├── controllers/    # API Controllers
│   │   ├── middleware/     # Authentication & Upload Middleware
│   │   ├── models/         # MongoDB Models
│   │   ├── routes/         # API Routes
│   │   ├── services/       # AI, OCR & Vector Services
│   │   ├── utils/          # Helper Functions
│   │   └── uploads/        # Temporary Uploaded Files
│   │
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd LawSaral
```

---

## Install Client

```bash
cd client
npm install
```

---

## Install Server

```bash
cd ../server
npm install
```

---

## Start Backend

```bash
npm run dev
```

---

## Start Frontend

```bash
cd ../client
npm run dev
```

---

# 📄 Supported File Formats

- PDF
- PNG
- JPG
- JPEG

Maximum Upload Size

- 10 MB

---

# 🤖 AI Workflow

## PDF Upload

```
Upload PDF
      │
      ▼
Extract Text
      │
      ▼
Chunk Document
      │
      ▼
Generate Embeddings
      │
      ▼
Store Vectors in Qdrant
      │
      ▼
Generate AI Summary
      │
      ▼
Document Ready for Chat
```

---

## Image Upload

```
Upload Image
      │
      ▼
Gemini Vision OCR
      │
      ▼
Extract Text
      │
      ▼
Chunk Document
      │
      ▼
Generate Embeddings
      │
      ▼
Store Vectors
      │
      ▼
Generate Summary
```

---

# 💬 RAG Pipeline

- Text Extraction
- OCR (Images)
- Intelligent Chunking
- Vector Embeddings
- Qdrant Vector Storage
- Semantic Search
- Context Retrieval
- Gemini AI Response Generation

---

# 🔒 Security Features

- Firebase Authentication
- User-specific Documents
- User-specific Chat History
- Protected APIs
- File Type Validation
- Upload Size Validation

---

# 📱 Responsive Design

✔ Desktop

✔ Tablet

✔ Mobile

---

# 🎯 Key Functionalities

- AI Legal Document Summary
- AI Legal Chat
- OCR for Images
- PDF Processing
- Semantic Search
- Retrieval-Augmented Generation (RAG)
- Upload History
- Document History
- General Legal Assistant
- Copy AI Responses
- Markdown Rendering

---

# 👨‍💻 Author

**Rajveer Verma**

Information Science & Engineering Student

MERN Stack Developer | AI Enthusiast | DSA

---

## ⭐ If you like this project, consider giving it a Star.