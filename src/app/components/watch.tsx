"use client";

import { Title } from "./title";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import "./border.css";

export default function Watch() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div id="watch" className="w-full ">
      <div className="mb-4 lg:mb-8">
        <Title subTitle="Watch" right={true} />
      </div>
      {isLoaded ? (
        <>
          <div className="overflow-hidden rounded-lg fancy-border">
            <ReactPlayer
              width="100%"
              height="500px"
              url="https://youtu.be/3DWK8802N00?t=2546"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
