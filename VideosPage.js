import React, { useState, useEffect } from "react";
import AOS from "aos"; // Import AOS for animations
import "aos/dist/aos.css"; // Import AOS styles
import Video from "../components/Content/Video"; // Import the Video component

// Updated videos data with more information, including genre
const videos = [
  {
    id: 1,
    title: "AI Explained",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "John Doe",
    date: "January 5, 2024",
    duration: "10 min",
    genre: "Technology",
  },
  {
    id: 2,
    title: "Blockchain Basics",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Jane Smith",
    date: "February 12, 2024",
    duration: "12 min",
    genre: "Finance",
  },
  {
    id: 3,
    title: "Understanding Quantum Computing",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Albert Einstein",
    date: "March 8, 2024",
    duration: "15 min",
    genre: "Science",
  },
  {
    id: 4,
    title: "Edge Computing Demystified",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Ada Lovelace",
    date: "April 18, 2024",
    duration: "8 min",
    genre: "Technology",
  },
  {
    id: 5,
    title: "The Future of 5G",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Nikola Tesla",
    date: "May 23, 2024",
    duration: "10 min",
    genre: "Technology",
  },
  {
    id: 6,
    title: "Cybersecurity for Beginners",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Kevin Mitnick",
    date: "June 14, 2024",
    duration: "14 min",
    genre: "Security",
  },
  {
    id: 7,
    title: "Introduction to IoT",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Grace Hopper",
    date: "July 9, 2024",
    duration: "9 min",
    genre: "Technology",
  },
  {
    id: 8,
    title: "Machine Learning 101",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Andrew Ng",
    date: "August 20, 2024",
    duration: "11 min",
    genre: "Technology",
  },
  {
    id: 9,
    title: "Data Science Basics",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Tim Berners-Lee",
    date: "September 4, 2024",
    duration: "13 min",
    genre: "Science",
  },
  {
    id: 10,
    title: "The Power of AI in Medicine",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Edward Snowden",
    date: "October 2, 2024",
    duration: "16 min",
    genre: "Healthcare",
  },
  {
    id: 11,
    title: "Blockchain Beyond Bitcoin",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Satoshi Nakamoto",
    date: "November 18, 2024",
    duration: "12 min",
    genre: "Finance",
  },
  {
    id: 12,
    title: "The Future of Fintech",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    author: "Elon Musk",
    date: "December 22, 2024",
    duration: "14 min",
    genre: "Finance",
  },
];

const VideosPage = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState(videos);

  // Initialize AOS for animations and scroll to top when the page loads
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200 });
    window.scrollTo(0, 0); // Scroll to the top on page load
  }, []);

  // Filter videos based on the selected genre
  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) => video.genre === selectedGenre)
      );
    }
  }, [selectedGenre]);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      style={{
        paddingTop: "80px",
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Heading with a quote and video count */}
      <div
        className="px-8 py-6"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
          Videos
        </h1>
        <p className="italic text-xl text-gray-700 dark:text-gray-300 mb-4">
          "Watch the future unfold"
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
          We have {filteredVideos.length} videos for you!
        </p>

        {/* Genre Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="genre"
            className="mr-4 text-gray-900 dark
          dark:text-gray-100"
          >
            Filter by Genre:
          </label>
          <select
            id="genre"
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Science">Science</option>
            <option value="Security">Security</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      {/* Grid layout for videos */}
      <div
        className="content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "95%",
          margin: "0 auto",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {filteredVideos.map((video, index) => (
          <div
            key={video.id}
            className="video-card p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 transition-all transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Delay each card to create a cascading effect
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {video.title}
            </h2>
            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-1">
              By {video.author} | {video.date}
            </p>
            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-4">
              {video.duration}
            </p>
            <Video title={video.title} url={video.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
