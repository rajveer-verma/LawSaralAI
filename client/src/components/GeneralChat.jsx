import { useState, useRef, useEffect } from "react";
import {
  chatWithAI,
  getGeneralChatHistory,
} from "../services/api";

import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import removeMarkdown from "remove-markdown";
import toast from "react-hot-toast";

import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaBalanceScale,
  FaCopy,
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const defaultMessage = [
  {
    role: "ai",
    text:
      "## 👋 Welcome to LawSaral AI\n\nAsk any legal question.\n\nI will explain legal concepts in **simple language**, provide **examples**, and guide you with easy-to-understand answers.",
    time: "",
  },
];

function GeneralChat() {

  const { user } = useAuth();

  const [showLogin, setShowLogin] =
    useState(false);

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState(defaultMessage);

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  useEffect(() => {

    if (!user) {

      setMessages(defaultMessage);

      setQuestion("");

      return;

    }

    loadHistory();

  }, [user]);

  const loadHistory = async () => {

    try {

      const res =
        await getGeneralChatHistory(
          user.uid
        );

      const history = [...defaultMessage];

      res.data.chats
        .reverse()
        .forEach((chat) => {

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

        });

      setMessages(history);

    } catch (err) {

      console.log(err);

      setMessages(defaultMessage);

    }

  };

  const handleSend = async () => {

    if (!user) {

      setShowLogin(true);

      return;

    }

    if (!question.trim() || loading)
      return;

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
        await chatWithAI(
          currentQuestion,
          user.uid
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
        "Failed to generate response."
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "❌ Sorry, something went wrong while generating the response.",
          time: "",
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
    <>
      <div className="bg-white rounded-2xl shadow-lg border p-6">

        <div className="flex items-center gap-3 mb-5">

          <FaBalanceScale
            className="text-green-600"
            size={32}
          />

          <div>

            <h2 className="text-2xl font-bold text-green-700">
              General Legal AI
            </h2>

            <p className="text-gray-500 text-sm">
              Ask any legal question without uploading a document.
            </p>

          </div>

        </div>

        <div className="h-[500px] overflow-y-auto rounded-xl border bg-slate-50 p-5">

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
                  size={30}
                  className="text-green-600 mr-3 mt-2"
                />
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-sm ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >

                {msg.role === "ai" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaCopy />
                    </button>
                  )}

                </div>

              </div>

              {msg.role === "user" && (
                <FaUserCircle
                  size={30}
                  className="text-green-600 ml-3 mt-2"
                />
              )}

            </div>

          ))}

          {loading && (

            <div className="flex items-center gap-3">

              <FaRobot
                size={28}
                className="text-green-600 animate-pulse"
              />

              <div className="bg-white border rounded-xl px-5 py-3">
                AI is thinking...
              </div>

            </div>

          )}

          <div ref={bottomRef}></div>

        </div>

        <div className="flex gap-3 mt-5">

          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask any legal question..."
            className="flex-1 border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 rounded-xl flex items-center gap-2 transition"
          >

            <FaPaperPlane />
            Send

          </button>

        </div>

      </div>

      <LoginModal
        open={showLogin}
        onClose={() =>
          setShowLogin(false)
        }
      />
    </>
  );

}

export default GeneralChat;