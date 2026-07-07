import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================================
// Upload Folder
// ======================================

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================================
// Storage
// ======================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    console.log("Upload Folder:", uploadDir);

    cb(null, uploadDir);

  },

  filename: (req, file, cb) => {

    const uniqueName =
      randomUUID() +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },
});

// ======================================
// File Filter
// ======================================

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, PNG and JPG files are allowed."
      ),
      false
    );

  }

};

// ======================================
// Multer
// ======================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 10 * 1024 * 1024,

  },

});

export default upload;