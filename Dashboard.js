import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSubscriptionStatus } from "../services/paymentService";
import { Link } from "react-router-dom";
import { FaCrown, FaLock } from "react-icons/fa";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (currentUser) {
        const status = await getSubscriptionStatus(currentUser.uid);
        setSubscriptionStatus(status);
      }
    };

    fetchSubscription();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto py-10 px-4 text-center mt-20">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Please log in to access your dashboard.
        </p>
        <Link
          to="/login"
          className="mt-4 text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center 
      bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      style={{ paddingTop: "80px", transition: "background-color 0.5s ease" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100 animate-fade-in-down">
        Welcome, {currentUser.displayName || currentUser.email}
      </h1>

      {/* Show subscription status */}
      {subscriptionStatus === "active" ? (
        <div className="premium-content animate-slide-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center text-yellow-500 dark:text-yellow-400">
            <FaCrown className="text-yellow-500 dark:text-yellow-400 mr-2" />{" "}
            Premium Content
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            You have access to all premium content including exclusive articles,
            videos, and podcasts.
          </p>
        </div>
      ) : (
        <div className="non-subscriber-content animate-slide-up mt-20">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center text-red-500 dark:text-red-400">
            <FaLock className="mr-2" /> No Active Subscription
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            You don't have an active subscription. To access premium content,
            please consider subscribing.
          </p>

          {/* Buttons for Subscription and Free Content */}
          <div className="flex justify-center space-x-6 mb-6">
            {/* Subscribe Button */}
            <Link
              to="/subscribe"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              Subscribe Now
            </Link>

            {/* Explore Free Content Button */}
            <Link
              to="/articles"
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              Explore Free Content
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
