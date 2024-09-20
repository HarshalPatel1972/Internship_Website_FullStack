import React from "react";
import CheckoutButton from "../components/Subscription/CheckoutButton";
import { FaCrown } from "react-icons/fa";

const SubscriptionPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center 
      bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      style={{ paddingTop: "80px", transition: "background-color 0.5s ease" }}
    >
      {/* Title with consistent font and adjusted margin */}
      <h1
        className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100 font-sans"
        style={{
          letterSpacing: "0.05em",
          marginBottom: "30px", // Increased spacing for better alignment
          marginTop: "30px", // Increased margin-top to push title down
        }}
      >
        Subscribe to Sitara
      </h1>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-6xl">
        {/* Basic Plan */}
        <div className="border p-6 sm:p-8 rounded-lg shadow-md text-center bg-white dark:bg-gray-800 dark:border-gray-700 transition-all transform hover:scale-105 hover:shadow-lg duration-300">
          <FaCrown className="text-yellow-500 text-3xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Basic Plan
          </h2>
          <p className="text-lg font-semibold my-4 text-gray-600 dark:text-gray-300">
            $5/month
          </p>
          <CheckoutButton plan="basic" />
        </div>

        {/* Premium Plan */}
        <div className="border p-6 sm:p-8 rounded-lg shadow-md text-center bg-white dark:bg-gray-800 dark:border-gray-700 transition-all transform hover:scale-105 hover:shadow-lg duration-300">
          <FaCrown className="text-yellow-500 text-3xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Premium Plan
          </h2>
          <p className="text-lg font-semibold my-4 text-gray-600 dark:text-gray-300">
            $10/month
          </p>
          <CheckoutButton plan="premium" />
        </div>

        {/* Pro Plan */}
        <div className="border p-6 sm:p-8 rounded-lg shadow-md text-center bg-white dark:bg-gray-800 dark:border-gray-700 transition-all transform hover:scale-105 hover:shadow-lg duration-300">
          <FaCrown className="text-yellow-500 text-3xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Pro Plan
          </h2>
          <p className="text-lg font-semibold my-4 text-gray-600 dark:text-gray-300">
            $15/month
          </p>
          <CheckoutButton plan="pro" />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
