import { useAuth } from "../context/AuthContext";

function Hero() {
  const { user } = useAuth();

  return (
    <section className="bg-slate-50 border-b">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            ⚖️ AI Powered Legal Assistant
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Understand Legal Documents
            <br />
            <span className="text-blue-600">
              in Simple Language & Ask Questions.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-600 leading-8">
            Get clear answers to legal questions. Upload any legal document and
            receive an AI-generated summary. Then ask questions about your
            document using
            <span className="font-semibold text-blue-600">
              {" "}
              Gemini AI, RAG, and VectorDB.
            </span>
          </p>

          {!user ? (
            <div className="mt-5">
              <div className="inline-block bg-yellow-50 border border-yellow-300 rounded-xl px-6 py-4">
                <p className="text-gray-700">
                  👇 Try the AI below.
                  <br />
                  You'll only be asked to login when you upload a document
                  or send your first message.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <div className="inline-block bg-green-50 border border-green-300 rounded-xl px-6 py-4">
                <p className="font-semibold text-green-700">
                  Welcome back, {user.displayName}! 👋
                </p>

                <p className="text-gray-600 mt-1">
                  You can now upload documents and chat with LawSaral AI.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;