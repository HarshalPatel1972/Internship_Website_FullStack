import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

// Firebase authentication functions
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logout = () => {
  return signOut(firebaseAuth);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(firebaseAuth, email);
};

// Function to update the user's name after signup
export const updateUserName = (name) => {
  const user = firebaseAuth.currentUser;
  if (user) {
    return updateProfile(user, {
      displayName: name,
    });
  } else {
    throw new Error("No authenticated user found.");
  }
};

// Send verification email
export const sendVerificationEmail = () => {
  const user = firebaseAuth.currentUser;
  if (user) {
    return sendEmailVerification(user);
  } else {
    throw new Error("No authenticated user found.");
  }
};
