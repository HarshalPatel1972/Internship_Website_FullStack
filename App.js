import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SubscriptionPage from "./pages/SubscriptionPage";
import ContentPage from "./pages/ContentPage";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/Auth/PrivateRoute";

// Importing Login and Signup pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArticlesPage from "./pages/ArticlesPage";
import PodcastsPage from "./pages/PodcastsPage";
import VideosPage from "./pages/VideosPage";

// Razorpay Checkout component
import RazorpayCheckout from "./components/RazorpayCheckout"; // You can place this in the 'components' folder

function App() {
  useEffect(() => {
    const pageOverlay = document.createElement("div");
    pageOverlay.className = "page-overlay";
    document.body.appendChild(pageOverlay);

    return () => {
      document.body.removeChild(pageOverlay);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />
            {/* Pages for Articles, Podcasts, and Videos */}
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            {/* Dashboard - Protected by PrivateRoute */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* Subscription, Success, and Cancel Pages */}
            <Route path="/subscribe" element={<SubscriptionPage />} />
            <Route path="/content/:id" element={<ContentPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            {/* Razorpay Checkout */}
            <Route path="/checkout" element={<RazorpayCheckout />} />{" "}
            {/* New route for Razorpay */}
            {/* Login and Signup Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
