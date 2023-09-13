"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="fixed left-0 right-0 -top-36 h-full z-0 brightness-0.4">
      {isLoaded ? (
        <ReactPlayer
          playbackRate={0.8}
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="1000px"
          url="https://youtu.be/oB325uTDKIw?si=FbP7X-cNp9hmUk2M"
        />
      ) : null}
    </div>
  );
}
