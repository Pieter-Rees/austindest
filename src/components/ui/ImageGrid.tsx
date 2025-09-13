import { OptimizedImage } from './OptimizedImage';
import { EmbedContainer } from './EmbedContainer';

interface ImageGridProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
  }>;
  className?: string;
}

export const ImageGrid = ({ images, className = '' }: ImageGridProps) => {
  const isSingleImage = images.length === 1;

  return (
    <div className={`grid grid-cols-3 gap-4 lg:gap-8 mb-4 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`flex flex-col h-full ${isSingleImage ? 'col-span-3' : ''}`}
        >
          <EmbedContainer className='flex-1'>
            <OptimizedImage
              src={image.src}
              width={image.width ?? 200}
              height={image.height ?? 300}
              alt={image.alt}
              priority={index === 0}
              quality={85}
              className='w-full h-full object-cover'
            />
          </EmbedContainer>
          {((image.title?.trim() ?? '') !== '' ||
            (image.description?.trim() ?? '') !== '') && (
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-2 text-center'>
              {image.title && (
                <h3 className='text-white font-bold text-lg mb-2'>
                  {image.title}
                </h3>
              )}
              {image.description && (
                <p className='text-white/80 text-sm'>{image.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
