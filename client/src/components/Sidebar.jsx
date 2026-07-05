import { useEffect, useState } from "react";
import {
  getUploadHistory,
  deleteDocument,
} from "../services/api";

import { useAuth } from "../context/AuthContext";

import {
  FaFilePdf,
  FaTrash,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Sidebar({
  onSelectDocument,
  sidebarOpen,
  setSidebarOpen,
}) {

  const { user } = useAuth();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {

    if (!user) return;

    try {

      const res =
        await getUploadHistory(user.uid);

      setDocuments(res.data.documents);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDocuments();

  }, [user]);

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this document?"
    );

    if (!ok) return;

    try {

      await deleteDocument(id);

      setDocuments((prev) =>
        prev.filter(
          (doc) => doc._id !== id
        )
      );

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };

  // Sidebar Closed
  if (!sidebarOpen) {

    return (

      <button
        onClick={() =>
          setSidebarOpen(true)
        }
        className="fixed left-4 top-24 z-50 bg-white shadow-lg border rounded-lg p-3 hover:bg-gray-100 transition"
      >

        <FaBars size={20} />

      </button>

    );

  }

  return (

    <aside className="w-72 bg-white border-r min-h-screen sticky top-0 transition-all duration-300">

      <div className="p-5 border-b flex justify-between items-center">

        <div className="flex items-center gap-3">

          <FaBars />

          <h2 className="font-bold text-xl">
            History
          </h2>

        </div>

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="text-gray-500 hover:text-red-600"
        >

          <FaTimes />

        </button>

      </div>

      <div className="p-4">

        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">

          Uploaded Documents

        </h3>

        {loading && (

          <p className="text-sm text-gray-500">

            Loading...

          </p>

        )}

        {!loading &&
          documents.length === 0 && (

            <p className="text-sm text-gray-500">

              No documents yet

            </p>

          )}

        <div className="space-y-2">

          {documents.map((doc) => (

            <div
              key={doc._id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
            >

              <button
                onClick={() =>
                  onSelectDocument(doc)
                }
                className="flex items-center gap-2 flex-1 text-left"
              >

                <FaFilePdf className="text-red-600" />

                <span className="truncate text-sm">

                  {doc.filename}

                </span>

              </button>

              <button
                onClick={() =>
                  handleDelete(doc._id)
                }
                className="text-red-500 hover:text-red-700"
              >

                <FaTrash />

              </button>

            </div>

          ))}

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;