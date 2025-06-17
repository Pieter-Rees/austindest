"use client";

import { Title } from "./title";
import "./border.css";
import { useEffect, useState } from "react";

interface SpotifyEmbed {
  url: string;
  height: number;
}

const spotifyEmbeds: SpotifyEmbed[] = [
  {
    url: "https://open.spotify.com/embed/artist/4i1SjBqGZ4lVlEgMfpKVjb?utm_source=generator&theme=0",
    height: 152
  },
  {
    url: "https://open.spotify.com/embed/track/6aV4L76qLqOXKWM2KDI1IU?utm_source=generator",
    height: 152
  },
  {
    url: "https://open.spotify.com/embed/track/21RfPY7y0nx5B0KuZm3k77?utm_source=generator",
    height: 152
  }
];

export default function Listen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spotifyErrors, setSpotifyErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error('Iframe error:', e);
    setError('Failed to load SoundCloud player');
  };

  const handleSpotifyError = (index: number) => (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error(`Spotify iframe error at index ${index}:`, e);
    setSpotifyErrors(prev => ({
      ...prev,
      [index]: 'Failed to load Spotify player'
    }));
  };

  return (
    <div>
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title right={true} subTitle="Listen" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 lg:h-auto">
          <div className="rounded-lg fancy-border overflow-hidden safari-fix">
            {error ? (
              <div className="text-red-500 p-4">{error}</div>
            ) : isLoaded ? (
              <iframe
                className="h-full"
                title="soundcloud sets"
                width="100%"
                loading="lazy"
                height="600px"
                allow="encrypted-media; autoplay"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1412583274&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                onError={handleIframeError}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="animate-pulse text-white">Loading SoundCloud player...</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-8">
          {spotifyEmbeds.map((embed, index) => (
            <div key={embed.url} className="overflow-hidden rounded-lg fancy-border safari-fix">
              {spotifyErrors[index] ? (
                <div className="text-red-500 p-4">{spotifyErrors[index]}</div>
              ) : (
                <iframe
                  src={embed.url}
                  width="100%"
                  height={embed.height}
                  loading="lazy"
                  allow="encrypted-media; autoplay"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  onError={handleSpotifyError(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
