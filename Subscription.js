const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true }, // basic/premium/pro
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: "active" }, // active/canceled/expired
  stripeSessionId: { type: String }, // Store Stripe session ID for subscription
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
