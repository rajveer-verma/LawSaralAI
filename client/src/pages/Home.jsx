import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";

import UploadSection from "../components/UploadSection";
import SummaryCard from "../components/SummaryCard";
import DocumentChat from "../components/DocumentChat";
import GeneralChat from "../components/GeneralChat";

import { getSingleDocument } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Home() {

  const { user } = useAuth();

  const [summary, setSummary] = useState("");
  const [documentName, setDocumentName] = useState("");

  const [documentId, setDocumentId] = useState("");
  const [qdrantDocumentId, setQdrantDocumentId] =
    useState("");

  const [sidebarOpen, setSidebarOpen] = useState(() => {

    const saved = localStorage.getItem(
      "lawsaral-sidebar"
    );

    return saved === null
      ? true
      : saved === "true";

  });

  // Reset when user logs out

  useEffect(() => {

    if (!user) {

      setSummary("");

      setDocumentName("");

      setDocumentId("");

      setQdrantDocumentId("");

    }

  }, [user]);

  // Save sidebar state

  useEffect(() => {

    localStorage.setItem(
      "lawsaral-sidebar",
      sidebarOpen
    );

  }, [sidebarOpen]);

  const handleUploadSuccess = (data) => {

    setSummary(data.summary);

    setDocumentName(data.filename);

    setDocumentId(data.documentId);

    setQdrantDocumentId(
      data.qdrantDocumentId
    );

  };

  const handleSelectDocument = async (doc) => {

    try {

      const res =
        await getSingleDocument(doc._id);

      const document =
        res.data.document;

      setSummary(document.summary);

      setDocumentName(
        document.filename
      );

      setDocumentId(
        document._id
      );

      setQdrantDocumentId(
        document.qdrantDocumentId
      );

    } catch (err) {

      console.log(err);

      toast.error(
        "Unable to open document."
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="flex">

        {user && (

          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onSelectDocument={
              handleSelectDocument
            }
          />

        )}

        <div className="flex-1">

          <Hero />

          <div className="max-w-7xl mx-auto px-6 pb-16">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <UploadSection
                onUploadSuccess={
                  handleUploadSuccess
                }
              />

              <GeneralChat />

            </div>

            {summary && (

              <div className="mt-10">

                <SummaryCard
                  summary={summary}
                  filename={documentName}
                />

              </div>

            )}

            {summary && (

              <div className="mt-10">

                <DocumentChat
                  documentId={documentId}
                  qdrantDocumentId={qdrantDocumentId}
                />

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Home;