import React, { useState, useEffect } from "react";
import AOS from "aos"; // Import AOS for animations
import "aos/dist/aos.css"; // Import AOS styles

// Updated articles data with more information
const articles = [
  {
    id: 1,
    title: "AI in 2024: Future Trends",
    content: "The future of AI is expanding rapidly...",
    author: "John Doe",
    genre: "Technology",
    date: "January 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Blockchain Technology Explained",
    content: "Blockchain continues to revolutionize...",
    author: "Jane Smith",
    genre: "Finance",
    date: "February 2, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Quantum Computing: Next Big Leap",
    content: "Quantum computing offers unparalleled...",
    author: "Albert Einstein",
    genre: "Technology",
    date: "March 18, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Cloud Computing Advances",
    content: "Cloud technology is the backbone of modern IT...",
    author: "Ada Lovelace",
    genre: "Technology",
    date: "April 25, 2024",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices",
    content: "Stay secure online with these strategies...",
    author: "Kevin Mitnick",
    genre: "Security",
    date: "May 5, 2024",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "The Rise of Edge Computing",
    content: "Edge computing brings computation closer...",
    author: "Linus Torvalds",
    genre: "Technology",
    date: "June 10, 2024",
    readTime: "5 min read",
  },
  {
    id: 7,
    title: "5G Networks and Their Future",
    content: "The rollout of 5G is changing industries...",
    author: "Grace Hopper",
    genre: "Technology",
    date: "July 22, 2024",
    readTime: "6 min read",
  },
  {
    id: 8,
    title: "Internet of Things: Growth in 2024",
    content: "The IoT is connecting devices at scale...",
    author: "Nikola Tesla",
    genre: "Technology",
    date: "August 14, 2024",
    readTime: "5 min read",
  },
  {
    id: 9,
    title: "The State of Fintech",
    content: "Fintech innovations are reshaping the financial world...",
    author: "Satoshi Nakamoto",
    genre: "Finance",
    date: "September 9, 2024",
    readTime: "7 min read",
  },
  {
    id: 10,
    title: "Advances in Machine Learning",
    content: "Machine learning models are becoming more accurate...",
    author: "Andrew Ng",
    genre: "Technology",
    date: "October 12, 2024",
    readTime: "9 min read",
  },
  {
    id: 11,
    title: "Digital Transformation Strategies",
    content: "Businesses are digitally transforming...",
    author: "Tim Berners-Lee",
    genre: "Business",
    date: "November 21, 2024",
    readTime: "8 min read",
  },
  {
    id: 12,
    title: "The Importance of Data Privacy",
    content: "Data privacy laws are stricter than ever...",
    author: "Edward Snowden",
    genre: "Security",
    date: "December 30, 2024",
    readTime: "6 min read",
  },
];

const ArticlesPage = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // Initialize AOS for animations and scroll to top when the page loads
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200 });
    window.scrollTo(0, 0); // Scroll to the top on page load
  }, []);

  // Filter articles based on the selected genre
  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) => article.genre === selectedGenre)
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
      {/* Heading with a quote and article count */}
      <div
        className="text-left px-6 py-6 md:px-8"
        style={{ transition: "padding 0.5s ease" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
          Articles
        </h1>
        <p className="italic text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
          "Explore the future through our articles"
        </p>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-400 mb-8">
          We have {filteredArticles.length} articles for you!
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
            <option value="Security">Security</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      {/* Grid layout for articles */}
      <div
        className="content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8 lg:px-12"
        style={{
          transition: "padding 0.5s ease", // Smooth padding transition for mobile
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {filteredArticles.map((article, index) => (
          <div
            key={article.id}
            className="article-card p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 transition-all transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Delay each card to create a cascading effect
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {article.title}
            </h2>
            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-1">
              By {article.author} | {article.date}
            </p>
            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-4">
              {article.readTime}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {article.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
