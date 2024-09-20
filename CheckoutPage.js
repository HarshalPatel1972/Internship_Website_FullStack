// src/pages/CheckoutPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For navigation and getting plan from URL params
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../services/paymentService"; // Your backend service for creating a session

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const { plan } = useParams(); // Get the selected plan from the URL params
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  // Prices for different plans (could also be fetched from the backend)
  const prices = {
    basic: 5,
    premium: 10,
    pro: 15,
  };

  useEffect(() => {
    // Check if the plan exists
    if (!prices[plan]) {
      navigate("/subscription"); // Redirect back to subscription if the plan is invalid
    } else {
      setPrice(prices[plan]);
    }
  }, [plan, navigate]);

  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Call your backend to create the checkout session
    const { sessionId } = await createCheckoutSession(plan);

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error("Stripe Checkout Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Checkout - {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          You are subscribing to the{" "}
          {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan for ${price}
          /month.
        </p>
        <button
          onClick={handlePayment}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
