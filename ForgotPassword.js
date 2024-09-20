import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await resetPassword(email);
      setMessage("Check your inbox for further instructions.");
    } catch {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
