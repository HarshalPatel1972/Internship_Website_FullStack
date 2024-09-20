// src/services/paymentService.js

// Define the getSubscriptionStatus function
export const getSubscriptionStatus = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/subscription-status/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subscription status");
    }

    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    throw error;
  }
};

// Export any other necessary functions like createCheckoutSession
export const createCheckoutSession = async (plan) => {
  try {
    const response = await fetch(
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
