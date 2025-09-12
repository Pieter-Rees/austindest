import { OptimizedImage } from './OptimizedImage';
import { EmbedContainer } from './EmbedContainer';

interface ImageGridProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
}

export const ImageGrid = ({ images, className = '' }: ImageGridProps) => {
  return (
    <div className={`grid grid-cols-3 gap-4 lg:gap-8 mb-4 ${className}`}>
      {images.map((image, index) => (
        <EmbedContainer key={index}>
          <OptimizedImage
            src={image.src}
            width={image.width ?? 200}
            height={image.height ?? 300}
            alt={image.alt}
            priority={index === 0}
            quality={85}
          />
        </EmbedContainer>
      ))}
    </div>
  );
};
