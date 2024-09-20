const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key
const cors = require("cors"); // Allow cross-origin requests if necessary
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const prices = {
  basic: "price_1Hxy1v2eZvKYlo2C0KLb0YYe", // Add your correct Stripe Price IDs
  premium: "price_1Hxy2v2eZvKYlo2C0PxA7KJ5",
  pro: "price_1Hxy3v2eZvKYlo2C2tLc9yQ6",
};

// Route to create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { plan } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: prices[plan], // Access correct Price ID from `prices` object
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Stripe Payment Server is Running on port 4000");
});
