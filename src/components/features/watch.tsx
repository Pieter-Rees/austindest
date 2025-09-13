'use client';

import { SectionHeader } from '../ui/SectionHeader';
import { EmbedContainer } from '../ui/EmbedContainer';
import { LoadingWrapper } from '../ui/LoadingWrapper';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import ReactPlayer from 'react-player';
import { YOUTUBE_VIDEO } from '@/lib';
import '@/styles/border.css';

export default function Watch() {
  return (
    <div className='w-full'>
      <SectionHeader subTitle='Watch' left={true} />
      <ErrorBoundary>
        <LoadingWrapper>
          <EmbedContainer responsive={true} aspectRatio='16/9' maxHeight='70vh'>
            <ReactPlayer
              width='100%'
              height='100%'
              light={true}
              src={YOUTUBE_VIDEO}
            />
          </EmbedContainer>
        </LoadingWrapper>
      </ErrorBoundary>
    </div>
  );
}
