import React, { useState } from "react";
import {
  signup,
  sendVerificationEmail,
  updateUserName,
} from "../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "", // Name field added
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // Sign up the user
      const userCredential = await signup(formData.email, formData.password);

      // Update the user's display name
      await updateUserName(formData.name);

      // Send verification email
      await sendVerificationEmail();

      setSuccessMessage(
        "Sign-up successful! A verification email has been sent. Please verify your email to continue."
      );

      // Redirect to login after 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="glassmorphism max-w-md w-full p-10 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Create an Account
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition"
              required
            />
          </div>
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
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

export default Signup;
