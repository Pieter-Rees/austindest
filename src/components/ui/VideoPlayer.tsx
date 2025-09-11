"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface VideoPlayerProps
  extends Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "width" | "height" | "onDurationChange"
  > {
  src: string;
  className?: string;
  title?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playing?: boolean;
  width?: string | number;
  height?: string | number;
  playbackRate?: number;
  preload?: "none" | "metadata" | "auto";
  poster?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onLoadStart?: () => void;
  onLoadedData?: () => void;
  onLoadedMetadata?: () => void;
  onCanPlay?: () => void;
  onCanPlayThrough?: () => void;
  onTimeUpdate?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVolumeChange?: (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => void;
  onDurationChange?: (duration: number) => void;
}

export interface VideoPlayerRef {
  play: () => Promise<void>;
  pause: () => void;
  load: () => void;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  paused: boolean;
  ended: boolean;
  readyState: number;
  networkState: number;
  videoWidth: number;
  videoHeight: number;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  getVideoElement: () => HTMLVideoElement | null;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (
    {
      src,
      className,
      title,
      controls = true,
      autoPlay = false,
      loop = false,
      muted = false,
      playing = false,
      width = "100%",
      height = "auto",
      playbackRate = 1,
      preload = "metadata",
      poster,
      onPlay,
      onPause,
      onEnded,
      onError,
      onLoadStart,
      onLoadedData,
      onLoadedMetadata,
      onCanPlay,
      onCanPlayThrough,
      onTimeUpdate,
      onVolumeChange,
      onDurationChange,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      load: () => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      },
      get currentTime() {
        return videoRef.current?.currentTime || 0;
      },
      get duration() {
        return videoRef.current?.duration || 0;
      },
      get volume() {
        return videoRef.current?.volume || 0;
      },
      get muted() {
        return videoRef.current?.muted || false;
      },
      get paused() {
        return videoRef.current?.paused || true;
      },
      get ended() {
        return videoRef.current?.ended || false;
      },
      get readyState() {
        return videoRef.current?.readyState || 0;
      },
      get networkState() {
        return videoRef.current?.networkState || 0;
      },
      get videoWidth() {
        return videoRef.current?.videoWidth || 0;
      },
      get videoHeight() {
        return videoRef.current?.videoHeight || 0;
      },
      seekTo: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      setVolume: (volume: number) => {
        if (videoRef.current) {
          videoRef.current.volume = Math.max(0, Math.min(1, volume));
        }
      },
      setMuted: (muted: boolean) => {
        if (videoRef.current) {
          videoRef.current.muted = muted;
        }
      },
      getVideoElement: () => videoRef.current,
    }));

    const handlePlay = useCallback(() => {
      onPlay?.();
    }, [onPlay]);

    const handlePause = useCallback(() => {
      onPause?.();
    }, [onPause]);

    const handleEnded = useCallback(() => {
      onEnded?.();
    }, [onEnded]);

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        onError?.(e);
      },
      [onError]
    );

    const handleLoadStart = useCallback(() => {
      onLoadStart?.();
    }, [onLoadStart]);

    const handleLoadedData = useCallback(() => {
      onLoadedData?.();
    }, [onLoadedData]);

    const handleLoadedMetadata = useCallback(
      (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        if (e.currentTarget) {
          e.currentTarget.playbackRate = playbackRate;
        }
        onLoadedMetadata?.();
      },
      [playbackRate, onLoadedMetadata]
    );

    const handleCanPlay = useCallback(() => {
      onCanPlay?.();
    }, [onCanPlay]);

    const handleCanPlayThrough = useCallback(() => {
      onCanPlayThrough?.();
    }, [onCanPlayThrough]);

    const handleTimeUpdate = useCallback(
      (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        onTimeUpdate?.(e);
      },
      [onTimeUpdate]
    );

    const handleVolumeChange = useCallback(
      (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        onVolumeChange?.(e);
      },
      [onVolumeChange]
    );

    const handleDurationChange = useCallback(
      (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        onDurationChange?.(e.currentTarget.duration);
      },
      [onDurationChange]
    );

    return (
      <video
        ref={videoRef}
        src={src}
        className={cn("w-full h-auto", className)}
        title={title}
        controls={controls}
        autoPlay={autoPlay || playing}
        loop={loop}
        muted={muted}
        playsInline
        preload={preload}
        poster={poster}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlayThrough}
        onTimeUpdate={handleTimeUpdate}
        onVolumeChange={handleVolumeChange}
        onDurationChange={handleDurationChange}
        {...props}
      />
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
