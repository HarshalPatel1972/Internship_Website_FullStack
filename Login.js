import React, { useState } from "react";
import {
  login,
  sendVerificationEmail,
  firebaseAuth,
} from "../services/authService"; // Updated to include sendVerificationEmail
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [resendLink, setResendLink] = useState(false); // For resending verification email
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors
    setResendLink(false); // Reset resend link option
    setLoading(true); // Set loading state for the button

    try {
      // Log in the user
      await login(formData.email, formData.password);

      // Refresh user profile to check email verification status
      await firebaseAuth.currentUser.reload();
      const user = firebaseAuth.currentUser;

      // Check if the email is verified
      if (!user.emailVerified) {
        setErrorMessage("Email not verified. Please verify your email.");
        setResendLink(true); // Offer to resend the verification email
        await firebaseAuth.signOut(); // Sign out the user if the email is not verified
      } else {
        // Successfully logged in and verified, now update navbar
        navigate("/dashboard"); // Redirect to the dashboard if verified
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
    } finally {
      setLoading(false); // Remove loading state after processing
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendVerificationEmail(); // Resend verification email
      setErrorMessage("A new verification email has been sent.");
      setResendLink(false); // Hide the resend option after successful send
    } catch (error) {
      setErrorMessage("Failed to send verification email. Please try again.");
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="glassmorphism max-w-md w-full p-10 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Welcome Back
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {resendLink && (
          <p
            className="text-blue-500 mb-4 cursor-pointer"
            onClick={handleResendVerification}
          >
            Resend Verification Email
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition"
              required
            />
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Glassmorphism Styling */}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .input-field:focus {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Login;
