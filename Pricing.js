import React from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-300 text-center">
          <h3 className="text-xl font-bold mb-2">Basic</h3>
          <p className="mb-4">$5/month</p>
          <Link
            to="/checkout?plan=basic"
            className="bg-blue-500 text-white px-4 py-2 inline-block"
          >
            Subscribe
          </Link>
        </div>
        <div className="p-4 border border-gray-300 text-center">
          <h3 className="text-xl font-bold mb-2">Standard</h3>
          <p className="mb-4">$10/month</p>
          <Link
            to="/checkout?plan=standard"
            className="bg-blue-500 text-white px-4 py-2 inline-block"
          >
            Subscribe
          </Link>
        </div>
        <div className="p-4 border border-gray-300 text-center">
          <h3 className="text-xl font-bold mb-2">Premium</h3>
          <p className="mb-4">$20/month</p>
          <Link
            to="/checkout?plan=premium"
            className="bg-blue-500 text-white px-4 py-2 inline-block"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
