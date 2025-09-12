"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function LandingBg() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="fixed left-0 right-0 h-screen z-0 brightness-0.4 scale-150 overflow-hidden">
      {isLoaded ? (
        <ReactPlayer
          width="100%"
          height="100%"
          src="https://youtu.be/oB325uTDKIw?si=FbP7X-cNp9hmUk2M"
          playing={true}
          loop={true}
          playbackRate={0.8}
          muted={true}
          controls={false}
          className="absolute top-0 left-0"
          style={{
            objectFit: "cover",
            transform: "scale(1.1)",
          }}
        />
      ) : null}
    </div>
  );
}
