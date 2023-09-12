"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="absolute left-0 right-0 top-0 h-full z-0 brightness-0.1">
      {isLoaded ? (
        <ReactPlayer
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="1000px"
          url="https://youtu.be/3DWK8802N00?t=2546"
        />
      ) : null}
    </div>
  );
}
