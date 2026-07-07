import { useEffect, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaCheckCircle,
  FaImage,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { uploadDocument } from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

function UploadSection({ onUploadSuccess }) {
  const fileInputRef = useRef(null);

  const { user } = useAuth();

  useEffect(() => {

  if (!user) {

    setSelectedFile("");

    setFileSize("");

    setUploaded(false);

    setLoading(false);

    setDragActive(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  }

}, [user]);

  const [showLogin, setShowLogin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [uploaded, setUploaded] = useState(false);

  const handleClick = () => {
    if (loading) return;

    if (!user) {
      setShowLogin(true);
      return;
    }

    fileInputRef.current.click();
  };

  const uploadFile = async (file) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload PDF, PNG or JPG.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Maximum file size is 10 MB.");
      return;
    }

    setUploaded(false);

    setSelectedFile(file.name);

    setFileSize(
      (file.size / (1024 * 1024)).toFixed(2) + " MB"
    );

    const formData = new FormData();

    formData.append("document", file);

    formData.append("firebaseUid", user.uid);

    try {
      setLoading(true);

      const res = await uploadDocument(formData);

      onUploadSuccess(res.data);

      setUploaded(true);

      toast.success(
        "Document uploaded successfully 📄"
      );

    } catch (err) {

      console.error(err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Upload Failed";

      toast.error(errorMessage);

      setUploaded(false);

      setSelectedFile("");

      setFileSize("");

    } finally {

      setLoading(false);

    }
  };

  const handleFileChange = (e) => {
    uploadFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    if (!loading) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 min-h-[560px] flex flex-col">

      <h2 className="text-2xl font-bold text-gray-800">
        Upload Document
      </h2>

      <p className="text-gray-500 mt-1 mb-5">
        Upload your legal document and let LawSaral AI analyze it.
      </p>

      <input
        hidden
        disabled={loading}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();

          if (!loading) {
            setDragActive(true);
          }
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-xl border-2 p-10 text-center transition flex-1 flex flex-col justify-center

        ${
          dragActive
            ? "border-blue-600 bg-blue-50"
            : "border-dashed border-blue-300 hover:bg-slate-50"
        }

        ${
          loading
            ? "opacity-70 cursor-not-allowed"
            : ""
        }
        `}
      >

        <FaCloudUploadAlt
          size={55}
          className={`mx-auto ${
            loading
              ? "animate-bounce text-blue-700"
              : "text-blue-600"
          }`}
        />

        <h3 className="font-bold text-xl mt-5">
          Drag & Drop Here
        </h3>

        <p className="text-gray-500 mt-2">
          or Click to Browse
        </p>

        <p className="text-xs text-gray-400 mt-4">
          {/* PDF • PNG • JPG • Max 10 MB */}
          PDF Max 10 MB
        </p>

      </div>

      {selectedFile && (

        <div className="mt-5 border rounded-xl p-4 bg-gray-50">

          <div className="flex items-center gap-3">

            {selectedFile
              .toLowerCase()
              .endsWith(".pdf") ? (

              <FaFilePdf
                className="text-red-600"
                size={28}
              />

            ) : (

              <FaImage
                className="text-blue-600"
                size={28}
              />

            )}

            <div className="flex-1">

              <p className="font-semibold truncate">
                {selectedFile}
              </p>

              <p className="text-sm text-gray-500">
                {fileSize}
              </p>

            </div>

            {uploaded && (

              <FaCheckCircle
                className="text-green-600"
                size={24}
              />

            )}

          </div>

        </div>

      )}

      {loading && (

        <div className="mt-5">

          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

            <div className="h-2 bg-blue-600 animate-pulse w-full"></div>

          </div>

          <p className="mt-3 text-blue-600 font-medium">
            🤖 AI is analyzing your document...
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Extracting text, generating embeddings and preparing summary...
          </p>

        </div>

      )}

      {uploaded && !loading && (

        <div className="mt-5 bg-green-50 border border-green-300 rounded-xl p-4">

          <div className="flex gap-3 items-center">

            <FaCheckCircle
              className="text-green-600"
              size={24}
            />

            <div>

              <h3 className="font-semibold text-green-700">
                ✅ Document Ready
              </h3>

              <p className="text-sm text-gray-600">
                Summary generated successfully.
                You can now ask questions below.
              </p>

            </div>

          </div>

        </div>

      )}

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />

    </div>
  );
}

export default UploadSection;