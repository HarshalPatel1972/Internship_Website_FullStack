import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../services/paymentService";

// Initialize Stripe with your actual publishable key
const stripePromise = loadStripe(
  "pk_test_51PvgZ8LX2ySKJrG2ICoatUhSb22uuHFsTJrVBP7J4qHoZtUzpSM0DfDOiFP1FV316EtmXiT2AHVJ978A2EACsph400k2dBPKFA"
);

const CheckoutButton = ({ plan }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    try {
      // Call your backend to create the checkout session
      const { url } = await createCheckoutSession(plan);

      if (url) {
        // Redirect to Stripe Checkout page
        window.location.href = url;
      } else {
        console.error("No checkout URL returned from server.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300"
    >
      Subscribe to {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
    </button>
  );
};

export default CheckoutButton;
