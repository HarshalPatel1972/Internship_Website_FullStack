import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  // Toggle dark mode with background spread effect
  const toggleDarkMode = () => {
    setOverlayActive(true); // Start the overlay animation
    setTimeout(() => {
      setDarkMode((prevMode) => !prevMode); // Toggle dark/light mode after animation
    }, 800); // Delay matches the animation duration

    setTimeout(() => {
      setOverlayActive(false); // Hide the overlay after mode switch
    }, 1600); // Ensure the overlay hides after dark mode is switched
  };

  // Apply the dark/light mode class to the body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <React.StrictMode>
      {/* Page overlay for background spread effect */}
      <div
        className={`page-overlay ${overlayActive ? "active" : ""}`}
        style={{
          "--color-bg": darkMode ? "#111827" : "#ffffff", // Set color based on mode
        }}
      ></div>
      <AuthProvider>
        <App toggleDarkMode={toggleDarkMode} />{" "}
        {/* Pass toggle function to App */}
      </AuthProvider>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);

reportWebVitals();
