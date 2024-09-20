import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { FaPodcast, FaRegNewspaper, FaVideo } from "react-icons/fa";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [isSpreading, setIsSpreading] = useState(false);

  const testimonials = [
    {
      name: "Elon Tusk",
      feedback:
        "Sitara charged my brain faster than any electric car! Their content is out of this world—just like Mars!",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Oprah Win-free",
      feedback:
        "I get Sitara! You get Sitara! Everyone gets Sitara! It’s the best place for podcasts that keep me tuned in!",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      name: "Bill Fences",
      feedback:
        "Forget building windows—I'm building my knowledge with Sitara! Their articles are simply gate-crashing awesome.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_nmu9der",
        "template_xqwklk8",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        "qYOJV5V7vI8_9IQDh"
      )
      .then(
        (result) => {
          setEmailSent(true);
          alert("Thank you, your message has been sent!");
        },
        (error) => {
          alert("Failed to send message, please try again.");
        }
      );
    setFormData({ name: "", email: "", message: "" });
  };

  // Create tile-based grid for spread effect
  useEffect(() => {
    const createGrid = () => {
      const gridContainer = document.querySelector(".grid-container");
      gridContainer.innerHTML = ""; // Clear previous tiles

      const numCols = Math.ceil(window.innerWidth / 50); // Set number of columns based on screen size
      const numRows = Math.ceil(window.innerHeight / 50); // Set number of rows based on screen size

      gridContainer.style.setProperty("--num-cols", numCols);
      gridContainer.style.setProperty("--num-rows", numRows);

      // Create tiles for grid
      for (let i = 0; i < numCols * numRows; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        gridContainer.appendChild(tile);
      }
    };

    // Create grid on load
    createGrid();

    window.addEventListener("resize", createGrid);

    return () => {
      window.removeEventListener("resize", createGrid);
    };
  }, []);

  // Handle dark/light mode toggle with tile-based spread effect
  useEffect(() => {
    const handleToggleDarkMode = () => {
      setIsSpreading(true); // Start the spreading animation

      // Trigger the tiles animation one by one
      const tiles = document.querySelectorAll(".tile");
      tiles.forEach((tile, index) => {
        setTimeout(() => {
          tile.classList.toggle("dark-mode");
        }, index * 30); // Delay based on tile index to create a wave effect
      });

      setTimeout(() => {
        setIsSpreading(false); // End the spreading animation after the wave finishes
      }, tiles.length * 30 + 500);
    };

    window.addEventListener("dark-mode-toggled", handleToggleDarkMode);

    return () => {
      window.removeEventListener("dark-mode-toggled", handleToggleDarkMode);
    };
  }, []);

  return (
    <div className="home-container bg-gradient-to-b from-blue-50 to-gray-50 min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      {/* Grid overlay for dark/light mode spread effect */}
      <div className={`grid-container ${isSpreading ? "spreading" : ""}`}></div>

      {/* Hero Section */}
      <div className="text-center mb-24 pt-72 px-4 md:px-0">
        <h1 className="text-3xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-wide font-playfair">
          Welcome to
        </h1>

        <h1 className="text-6xl md:text-8xl text-blue-600 dark:text-blue-400 font-extrabold mt-2">
          <span className="hover:text-blue-800 dark:hover:text-blue-500 transition duration-500 hover:scale-110 inline-block font-montserrat">
            Sitara
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-md md:max-w-2xl mx-auto mb-12 font-light mt-4">
          Unlock exclusive access to premium articles, videos, and podcasts with
          our subscription service. Dive into expertly curated content,
          handpicked to inform, inspire, and entertain—delivered directly to you
          from top sources around the globe.
        </p>
        <a
          href="/subscribe"
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
        >
          Subscribe Now
        </a>
      </div>

      {/* Features Section */}
      <div className="features-section max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 p-8 rounded-lg shadow-lg dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700">
        <div className="feature-card bg-white shadow-md p-8 rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-gray-800">
          <FaRegNewspaper className="text-4xl text-blue-500 mb-4 dark:text-blue-300" />
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Exclusive Articles
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Stay informed with premium articles written by industry experts
            across various fields like AI, technology, and more.
          </p>
        </div>

        <div className="feature-card bg-white shadow-md p-8 rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-gray-800">
          <FaPodcast className="text-4xl text-blue-500 mb-4 dark:text-blue-300" />
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Engaging Podcasts
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Listen to high-quality podcasts curated from industry leaders and
            influencers in technology, finance, and entertainment.
          </p>
        </div>

        <div className="feature-card bg-white shadow-md p-8 rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-gray-800">
          <FaVideo className="text-4xl text-blue-500 mb-4 dark:text-blue-300" />
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            In-depth Videos
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Watch educational videos to broaden your knowledge on various
            trending topics.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section bg-gradient-to-r from-gray-50 to-gray-100 py-12 w-full text-center mb-24 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-12">
          What Our Subscribers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white p-8 rounded-lg shadow-md dark:bg-gray-800"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-section bg-gray-50 py-16 w-full text-center dark:bg-gray-900">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="glassmorphism max-w-lg mx-auto p-8 rounded-lg shadow-md dark:bg-gray-800"
        >
          <div className="mb-4 relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              required
            />
          </div>
          <div className="mb-4 relative">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
        {emailSent && (
          <div className="mt-4 text-green-500 dark:text-green-400">
            Thank you for contacting us! We will get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
