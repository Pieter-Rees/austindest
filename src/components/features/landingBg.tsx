'use client';
import React from 'react';
import ReactPlayer from 'react-player';
import { LoadingWrapper } from '../ui/LoadingWrapper';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { BACKGROUND_VIDEO } from '@/lib';

export default function LandingBg() {
  return (
    <div className='fixed left-0 right-0 h-screen z-0 brightness-0.4 scale-150 overflow-hidden'>
      <ErrorBoundary>
        <LoadingWrapper>
          <ReactPlayer
            width='100%'
            height='100%'
            src={BACKGROUND_VIDEO}
            playing={true}
            loop={true}
            playbackRate={0.8}
            muted={true}
            controls={false}
            className='absolute top-0 left-0'
            style={{
              objectFit: 'cover',
              transform: 'scale(1.1)',
            }}
          />
        </LoadingWrapper>
      </ErrorBoundary>
    </div>
  );
}
