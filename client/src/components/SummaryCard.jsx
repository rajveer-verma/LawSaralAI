import {
  FaRobot,
  FaFilePdf,
  FaCopy,
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import removeMarkdown from "remove-markdown";
import toast from "react-hot-toast";

function SummaryCard({ summary, filename }) {
  if (!summary) return null;

  const copySummary = async () => {
    try {

      const plainText = removeMarkdown(summary)
        .replace(/^#{1,6}\s/gm, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/`/g, "")
        .replace(/>/g, "")
        .replace(/^\s*[-+]\s/gm, "• ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      await navigator.clipboard.writeText(
        plainText
      );

      toast.success("Summary copied");

    } catch (err) {

      console.log(err);

      toast.error("Failed to copy summary");

    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <FaRobot
              className="text-blue-600"
              size={32}
            />

            <h2 className="text-3xl font-bold text-blue-700">
              AI Summary
            </h2>

          </div>

          <div className="flex items-center gap-2 mt-3">

            <FaFilePdf
              className="text-red-600"
            />

            <span className="text-gray-600 font-medium">
              {filename}
            </span>

          </div>

        </div>

        <button
          onClick={copySummary}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >

          <FaCopy />

          Copy

        </button>

      </div>

      <div className="mt-8 bg-slate-50 border rounded-xl p-6 max-h-[650px] overflow-y-auto">

        <div className="prose prose-slate max-w-none">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {summary}
          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
}

export default SummaryCard;