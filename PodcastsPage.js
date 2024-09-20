import React, { useState, useEffect } from "react";
import AOS from "aos"; // Import AOS for animations
import "aos/dist/aos.css"; // Import AOS styles

// Updated podcasts data with more information, including genre
const podcasts = [
  {
    id: 1,
    title: "AI Disruption",
    url: "https://example.com/podcast1.mp3",
    author: "Jane Doe",
    date: "January 10, 2024",
    duration: "30 min",
    genre: "Technology",
  },
  {
    id: 2,
    title: "Future of Blockchain",
    url: "https://example.com/podcast2.mp3",
    author: "John Smith",
    date: "February 14, 2024",
    duration: "25 min",
    genre: "Finance",
  },
  {
    id: 3,
    title: "Quantum Mechanics Simplified",
    url: "https://example.com/podcast3.mp3",
    author: "Albert Einstein",
    date: "March 21, 2024",
    duration: "40 min",
    genre: "Science",
  },
  {
    id: 4,
    title: "Digital Transformation",
    url: "https://example.com/podcast4.mp3",
    author: "Ada Lovelace",
    date: "April 30, 2024",
    duration: "35 min",
    genre: "Business",
  },
  {
    id: 5,
    title: "The Edge Computing Era",
    url: "https://example.com/podcast5.mp3",
    author: "Grace Hopper",
    date: "May 12, 2024",
    duration: "28 min",
    genre: "Technology",
  },
  {
    id: 6,
    title: "Cloud Computing Explained",
    url: "https://example.com/podcast6.mp3",
    author: "Linus Torvalds",
    date: "June 18, 2024",
    duration: "32 min",
    genre: "Technology",
  },
  {
    id: 7,
    title: "5G: What’s Next?",
    url: "https://example.com/podcast7.mp3",
    author: "Nikola Tesla",
    date: "July 4, 2024",
    duration: "22 min",
    genre: "Technology",
  },
  {
    id: 8,
    title: "Securing Your Online Presence",
    url: "https://example.com/podcast8.mp3",
    author: "Kevin Mitnick",
    date: "August 14, 2024",
    duration: "27 min",
    genre: "Security",
  },
  {
    id: 9,
    title: "IoT Devices & Their Impact",
    url: "https://example.com/podcast9.mp3",
    author: "Satoshi Nakamoto",
    date: "September 20, 2024",
    duration: "30 min",
    genre: "Technology",
  },
  {
    id: 10,
    title: "The Power of Machine Learning",
    url: "https://example.com/podcast10.mp3",
    author: "Andrew Ng",
    date: "October 7, 2024",
    duration: "38 min",
    genre: "Technology",
  },
  {
    id: 11,
    title: "Understanding Data Science",
    url: "https://example.com/podcast11.mp3",
    author: "Tim Berners-Lee",
    date: "November 2, 2024",
    duration: "45 min",
    genre: "Science",
  },
  {
    id: 12,
    title: "AI in Healthcare",
    url: "https://example.com/podcast12.mp3",
    author: "Edward Snowden",
    date: "December 16, 2024",
    duration: "50 min",
    genre: "Healthcare",
  },
];

const PodcastsPage = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  // Initialize AOS for animations and scroll to top when the page loads
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200 });
    window.scrollTo(0, 0); // Scroll to the top on page load
  }, []);

  // Filter podcasts based on the selected genre
  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredPodcasts(podcasts);
    } else {
      setFilteredPodcasts(
        podcasts.filter((podcast) => podcast.genre === selectedGenre)
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
      {/* Heading with a quote and podcast count */}
      <div
        className="text-left px-6 py-6 md:px-8"
        style={{ transition: "padding 0.5s ease" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
          Podcasts
        </h1>
        <p className="italic text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
          "Tune in to the latest innovations"
        </p>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-400 mb-8">
          We have {filteredPodcasts.length} podcasts for you!
        </p>

        {/* Genre Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="genre"
            className="mr-4 text-gray-900 dark:text-gray-100"
          >
            Filter by Genre:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="py-2 px-4 rounded border dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="All">All</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Science">Science</option>
            <option value="Security">Security</option>
            <option value="Business">Business</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      {/* Grid layout for podcasts */}
      <div
        className="content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8 lg:px-12"
        style={{
          transition: "padding 0.5s ease", // Smooth padding transition for mobile
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {filteredPodcasts.map((podcast, index) => (
          <div
            key={podcast.id}
            className="podcast-card p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 transition-all transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Delay each card to create a cascading effect
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {podcast.title}
            </h2>
            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-1">
              By {podcast.author} | {podcast.date}
            </p>
            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-4">
              {podcast.duration}
            </p>
            <audio controls>
              <source src={podcast.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastsPage;
