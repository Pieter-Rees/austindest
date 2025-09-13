import type { ReactNode } from 'react';

interface EmbedContainerProps {
  children: ReactNode;
  className?: string;
  height?: string;
  responsive?: boolean;
  aspectRatio?: string;
  maxHeight?: string;
}

export const EmbedContainer = ({
  children,
  className = '',
  height = 'auto',
  responsive = false,
  aspectRatio = '16/9',
  maxHeight = '80vh',
}: EmbedContainerProps) => {
  const containerStyle = responsive
    ? {
        aspectRatio,
        maxHeight,
        height: 'auto',
      }
    : { height };

  return (
    <div
      className={`overflow-hidden rounded-lg fancy-border safari-fix ${className}`}
      style={containerStyle}
    >
      {children}
    </div>
  );
};
