import { useEffect } from "react";

const RazorpayCheckout = () => {
  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: 50000, // Amount in paise (e.g., 50000 paise = INR 500)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "/your_logo.png",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayCheckout;
