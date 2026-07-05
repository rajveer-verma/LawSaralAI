import { Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

function Navbar() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = async () => {
    try {

      await signOut(auth);

      setOpen(false);

      toast.success("Logged out successfully 👋");

    } catch (err) {

      console.error("Logout Error:", err);

      toast.error("Logout failed");

    }
  };

  const firstLetter =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto h-16 px-8 flex items-center justify-between">

          <Link
            to="/"
            className="text-3xl font-bold text-blue-600"
          >
            ⚖️ LawSaral
          </Link>

          {!user ? (

            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Login
            </button>

          ) : (

            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3"
              >
                {user.photoURL ? (

                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />

                ) : (

                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {firstLetter}
                  </div>

                )}

                <div className="hidden md:block text-left">

                  <p className="font-semibold text-gray-800">
                    {user.displayName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>

                </div>

              </button>

              {open && (

                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden">

                  <div className="px-4 py-3 border-b">

                    <p className="font-semibold text-gray-800">
                      {user.displayName}
                    </p>

                    <p className="text-xs text-gray-500 break-all">
                      {user.email}
                    </p>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </header>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />

    </>
  );
}

export default Navbar;