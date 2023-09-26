"use client";

import { Title } from "./title";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import "./border.css";

export default function Watch() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div id="watch" className="w-full ">
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title subTitle="Watch" left={true} />
      </div>
      {isLoaded ? (
        <>
          <div className="overflow-hidden rounded-lg fancy-border">
            <ReactPlayer
              width="100%"
              height="500px"
              light={true}
              url="https://youtu.be/3DWK8802N00?t=2546"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
