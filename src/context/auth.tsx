import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean; // Add a loading state
}>({
  user: null,
  setUser: () => {},
  loading: true, // Initially true while user state is loading
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the authenticated user
      } else {
        setUser(null); // No user logged in
      }
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const value = { user, setUser, loading }; // Provide loading state

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  return { user, loading }; // Expose loading state too
};

export default AuthContext;