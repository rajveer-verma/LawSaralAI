import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import {
  chatWithDocument,
  getDocumentChatHistory,
} from "../services/api";

import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaCopy,
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import removeMarkdown from "remove-markdown";

function DocumentChat({
  documentId,
  qdrantDocumentId,
}) {
  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (!documentId) return;

    loadHistory();
  }, [documentId]);

  const loadHistory = async () => {

    try {

      const res =
        await getDocumentChatHistory(
          documentId
        );

      const history = [
        {
          role: "ai",
          text:
            "## 👋 Hello\n\nI have analyzed your uploaded document.\n\nAsk me anything related to this PDF.",
          time: "",
        },
      ];

      res.data.chats.forEach(
        (chat) => {

          history.push({
            role: "user",
            text: chat.question,
            time: new Date(
              chat.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });

          history.push({
            role: "ai",
            text: chat.answer,
            time: new Date(
              chat.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });

        }
      );

      setMessages(history);

    } catch (err) {

      console.log(err);

      setMessages([
        {
          role: "ai",
          text:
            "## 👋 Hello\n\nI have analyzed your uploaded document.\n\nAsk me anything related to this PDF.",
          time: "",
        },
      ]);

    }

  };

  const handleSend = async () => {

    if (!question.trim() || loading)
      return;

    if (
      !documentId ||
      !qdrantDocumentId
    ) {

      toast.error(
        "Please upload a document first."
      );

      return;

    }

    const currentQuestion =
      question.trim();

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },
    ]);

    try {

      setLoading(true);

      const res =
        await chatWithDocument(
          currentQuestion,
          documentId,
          qdrantDocumentId
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.answer,
          time: new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        },
      ]);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to get answer."
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "❌ Something went wrong while fetching the answer.",
          time: new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();

    }

  };

  const copyAnswer = (text) => {

    const plainText =
      removeMarkdown(text);

    navigator.clipboard.writeText(
      plainText
    );

    toast.success("Copied");

  };

    return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-blue-700">
        🤖 Chat with Uploaded Document
      </h2>

      <p className="text-gray-500 mt-2">
        AI will answer only from your uploaded PDF.
      </p>

      <div className="mt-6 h-[500px] overflow-y-auto rounded-xl border bg-slate-50 p-5">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex mb-6 ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {msg.role === "ai" && (

              <FaRobot
                size={32}
                className="text-blue-600 mr-3 mt-2"
              />

            )}

            <div
              className={`max-w-[75%] rounded-2xl px-5 py-4 shadow ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >

              {msg.role === "ai" ? (

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.text}
                </ReactMarkdown>

              ) : (

                <p className="whitespace-pre-wrap">
                  {msg.text}
                </p>

              )}

              <div className="flex justify-between items-center mt-4">

                <small className="text-gray-400">
                  {msg.time}
                </small>

                {msg.role === "ai" && (

                  <button
                    onClick={() =>
                      copyAnswer(msg.text)
                    }
                    title="Copy Answer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >

                    <FaCopy />

                  </button>

                )}

              </div>

            </div>

            {msg.role === "user" && (

              <FaUserCircle
                size={32}
                className="text-blue-600 ml-3 mt-2"
              />

            )}

          </div>

        ))}

        {loading && (

          <div className="flex items-center gap-3">

            <FaRobot
              className="text-blue-600 animate-pulse"
              size={30}
            />

            <div className="bg-white border rounded-xl px-5 py-3">

              AI is thinking...

            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      <div className="flex gap-3 mt-6">

        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your uploaded document..."
          className="flex-1 border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 rounded-xl flex items-center gap-2 transition"
        >

          <FaPaperPlane />

          Send

        </button>

      </div>

    </div>
  );
}

export default DocumentChat;