import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { saveUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        setLoading(true);

        if (currentUser) {

          setUser(currentUser);

          try {

            await saveUser({
              firebaseUid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            });

          } catch (err) {

            console.error(
              "Error Saving User:",
              err
            );

          }

        } else {

          setUser(null);

        }

        setLoading(false);

      }
    );

    return () => unsubscribe();

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >

      {!loading && children}

    </AuthContext.Provider>

  );

}

export function useAuth() {
  return useContext(AuthContext);
}