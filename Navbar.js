import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaHome,
  FaNewspaper,
  FaPodcast,
  FaVideo,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons
import { useAuth } from "../context/AuthContext";
import { firebaseAuth } from "../services/authService";
import logo from "../assets/images/logo.png";

const starSymbols = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [authUser, setAuthUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setAuthUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to create a tile grid for the spread effect
  const createTileGrid = () => {
    const overlay = document.querySelector(".page-overlay");
    overlay.innerHTML = ""; // Clear previous tiles

    const tileCount = 30; // Define the number of tiles
    for (let i = 0; i < tileCount; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      overlay.appendChild(tile);
    }
  };

  const toggleDarkMode = (e) => {
    createTileGrid();

    // Get the position of the toggle button to center the spread
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const pageOverlay = document.querySelector(".page-overlay");
    pageOverlay.style.setProperty("--x", `${x}px`);
    pageOverlay.style.setProperty("--y", `${y}px`);

    pageOverlay.classList.add("spread");

    setTimeout(() => {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle("dark", !darkMode);
    }, 300); // Apply dark mode after the spread effect starts

    setTimeout(() => {
      pageOverlay.classList.remove("spread");
    }, 1000); // Remove spread after animation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Hover effect on "Sitara"
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;
    const sitaraElement = document.querySelector("#sitara-text");

    const onHover = (event) => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }
            return starSymbols[Math.floor(Math.random() * starSymbols.length)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 8;
      }, 60);
    };

    if (sitaraElement) {
      sitaraElement.addEventListener("mouseover", onHover);
    }

    return () => {
      if (sitaraElement)
        sitaraElement.removeEventListener("mouseover", onHover);
    };
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-6 w-full z-50 px-4 py-2 transition-all ease-in-out duration-300 bg-transparent md:py-4">
        <div className="container mx-auto flex justify-between items-center w-full px-4">
          {/* Sitara Logo (Aligned to the left) */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Sitara Logo"
              className="w-10 h-10 mr-2 md:w-12 md:h-12"
            />
            <span
              id="sitara-text"
              data-value="Sitara"
              className="text-3xl md:text-4xl font-bold tracking-wide transition-transform duration-300 transform hover:scale-105"
              style={{
                fontFamily: "Poppins, sans-serif",
                backgroundImage: "linear-gradient(45deg, #89f7fe, #66a6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 3px rgba(102, 166, 255, 0.3)",
              }}
            >
              Sitara
            </span>
          </Link>

          {/* Dark/Light Mode Toggle Button (Aligned to the right, perfectly inline with Sitara) */}
          <button
            onClick={toggleDarkMode}
            className="ml-auto text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            style={{
              height: "2.5rem", // Ensuring button height matches the logo height
              width: "2.5rem",
              marginTop: "-2.5rem", // Shift toggle button upwards to align with logo
            }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Floating Bottom Navbar */}
      <nav className="fixed bottom-6 w-full z-50 flex justify-center">
        <div className="floating-navbar bg-white dark:bg-gray-800 shadow-lg py-2 px-4 md:px-6 rounded-full flex items-center space-x-3 md:space-x-6">
          {/* Use icons for mobile view */}
          {isMobile ? (
            <>
              <Link
                to="/"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                <FaHome size={20} />
              </Link>
              <Link
                to="/articles"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                <FaNewspaper size={20} />
              </Link>
              <Link
                to="/podcasts"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                <FaPodcast size={20} />
              </Link>
              <Link
                to="/videos"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                <FaVideo size={20} />
              </Link>
              {!authUser ? (
                <>
                  <Link
                    to="/login"
                    className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
                  >
                    <FaSignInAlt size={20} />
                  </Link>
                  <Link
                    to="/signup"
                    className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
                  >
                    <FaUserPlus size={20} />
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
                >
                  <FaSignOutAlt size={20} />
                </button>
              )}
            </>
          ) : (
            // Use text for desktop view
            <>
              <Link
                to="/"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                Articles
              </Link>
              <Link
                to="/podcasts"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                Podcasts
              </Link>
              <Link
                to="/videos"
                className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
              >
                Videos
              </Link>
              {!authUser ? (
                <>
                  <Link
                    to="/login"
                    className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="text-lg text-gray-800 dark:text-white hover:text-blue-500"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
