import { useEffect, useState } from 'react';

interface SoundCloudEmbedProps {
  url: string;
  height?: string;
}

export default function SoundCloudEmbed({ url, height = '600px' }: SoundCloudEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return <div className="text-red-500">Failed to load SoundCloud player: {error}</div>;
  }

  return (
    <div className="w-full h-full">
      {isLoaded && (
        <iframe
          className="w-full h-full"
          title="soundcloud player"
          width="100%"
          height={height}
          loading="lazy"
          allow="encrypted-media"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          src={url}
          onError={(e) => setError('Failed to load SoundCloud player')}
        />
      )}
    </div>
  );
} 