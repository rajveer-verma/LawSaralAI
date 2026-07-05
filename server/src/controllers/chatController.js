import DocumentChat from "../models/DocumentChat.js";
import GeneralChat from "../models/GeneralChat.js";
import User from "../models/User.js";

import { askDocument } from "../services/ragService.js";
import { askGeneralAI } from "../services/chatService.js";



// ======================================
// Document Chat
// ======================================

export const chatWithDocument = async (req, res) => {
  try {

    const {
      question,
      documentId,
      qdrantDocumentId,
    } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
    }

    if (!qdrantDocumentId) {
      return res.status(400).json({
        success: false,
        message: "Qdrant Document ID is required",
      });
    }

    const answer = await askDocument(
      qdrantDocumentId,
      question
    );

    await DocumentChat.create({
      documentId,
      question,
      answer,
    });

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (err) {

    console.error("Document Chat Error:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Something went wrong.",
    });

  }
};



// ======================================
// Document Chat History
// ======================================

export const getDocumentChatHistory = async (req, res) => {

  try {

    const { documentId } = req.params;

    const chats = await DocumentChat.find({
      documentId,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      chats,
    });

  } catch (err) {

    console.error("Document History Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};



// ======================================
// General Chat
// ======================================

export const generalChat = async (req, res) => {

  try {

    const {
      question,
      firebaseUid,
    } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

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

    const answer = await askGeneralAI(question);

    await GeneralChat.create({
      userId: user._id,
      question,
      answer,
    });

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (err) {

    console.error("General Chat Error:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Something went wrong.",
    });

  }

};



// ======================================
// General Chat History
// ======================================

export const getGeneralChatHistory = async (req, res) => {

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

    const chats = await GeneralChat.find({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      chats,
    });

  } catch (err) {

    console.error("General History Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};