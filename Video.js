import React from "react";

const Video = ({ url }) => {
  return (
    <div className="video-wrapper">
      <iframe
        width="100%"
        height="250"
        src={url}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Video;
