import React from 'react';
import { render, screen } from '@testing-library/react';
import Listen from '@/components/features/listen';

// Mock the CSS import
jest.mock('@/styles/border.css', () => ({}));

interface LazyIframeProps {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
}

interface SectionHeaderProps {
  right?: boolean;
  subTitle?: string;
}

interface EmbedContainerProps {
  children: React.ReactNode;
  height?: string | number;
}

// Mock LazyIframe to avoid intersection observer issues
jest.mock('@/components/ui/LazyIframe', () => ({
  LazyIframe: ({ src, title, width, height }: LazyIframeProps) => (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      data-testid='lazy-iframe'
    />
  ),
}));

// Mock SectionHeader
jest.mock('@/components/ui/SectionHeader', () => ({
  SectionHeader: ({ right, subTitle }: SectionHeaderProps) => (
    <div data-testid='section-header'>
      <h1 data-testid='title'>{subTitle}</h1>
      <p data-testid='props'>right:{String(right)} center:false</p>
    </div>
  ),
}));

// Mock EmbedContainer
jest.mock('@/components/ui/EmbedContainer', () => ({
  EmbedContainer: ({ children, height }: EmbedContainerProps) => (
    <div data-testid='embed-container' style={{ height }}>
      {children}
    </div>
  ),
}));

describe('Listen', () => {
  it('renders section header with correct props', () => {
    render(<Listen />);

    expect(screen.getByText('Listen')).toBeInTheDocument();
    expect(screen.getByTestId('props')).toHaveTextContent(
      'right:true center:false'
    );
  });

  it('renders SoundCloud embed', () => {
    render(<Listen />);

    const soundcloudIframe = screen.getByTitle('soundcloud sets');
    expect(soundcloudIframe).toBeInTheDocument();
    expect(soundcloudIframe).toHaveAttribute(
      'src',
      expect.stringContaining('soundcloud.com')
    );
    expect(soundcloudIframe).toHaveAttribute('width', '100%');
    expect(soundcloudIframe).toHaveAttribute('height', '600px');
  });

  it('renders Spotify embeds', () => {
    render(<Listen />);

    const spotifyArtist = screen.getByTitle('Spotify Artist');
    const spotifyTrack1 = screen.getByTitle('Spotify Track 1');
    const spotifyTrack2 = screen.getByTitle('Spotify Track 2');

    expect(spotifyArtist).toBeInTheDocument();
    expect(spotifyTrack1).toBeInTheDocument();
    expect(spotifyTrack2).toBeInTheDocument();

    expect(spotifyArtist).toHaveAttribute(
      'src',
      expect.stringContaining('spotify.com')
    );
    expect(spotifyTrack1).toHaveAttribute(
      'src',
      expect.stringContaining('spotify.com')
    );
    expect(spotifyTrack2).toHaveAttribute(
      'src',
      expect.stringContaining('spotify.com')
    );
  });

  it('wraps all embeds in EmbedContainer', () => {
    render(<Listen />);

    const embedContainers = screen.getAllByTestId('embed-container');
    expect(embedContainers).toHaveLength(4); // 1 SoundCloud + 3 Spotify
  });

  it('renders all iframes', () => {
    render(<Listen />);

    const iframes = screen.getAllByTestId('lazy-iframe');
    expect(iframes).toHaveLength(4); // 1 SoundCloud + 3 Spotify
  });

  it('renders without crashing', () => {
    render(<Listen />);

    expect(screen.getByText('Listen')).toBeInTheDocument();
  });
});
