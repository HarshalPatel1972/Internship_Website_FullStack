import React, { createContext, useContext, useEffect, useState } from "react";
import {
  firebaseAuth,
  signup,
  login,
  logout,
  resetPassword,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignup = async (email, password) => {
    const userCredential = await signup(email, password);
    if (userCredential) {
      // Signup was successful, but don't automatically log the user in
      return userCredential;
    }
  };

  const handleLogin = async (email, password) => {
    const userCredential = await login(email, password);
    await firebaseAuth.currentUser.reload(); // Ensure the user state is fresh
    setCurrentUser(firebaseAuth.currentUser); // Set current user immediately
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null); // Clear current user on logout
  };

  const value = {
    currentUser,
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
