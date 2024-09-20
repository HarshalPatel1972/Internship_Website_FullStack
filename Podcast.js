import React from "react";

const Podcast = ({ title, audioUrl }) => {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 transition-all transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Podcast;
