import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment Method created:", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
