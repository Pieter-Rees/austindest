"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="absolute left-0 right-0 top-0 h-full z-0 brightness-0.3">
      {isLoaded ? (
        <ReactPlayer
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
