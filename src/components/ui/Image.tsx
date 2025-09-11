import Image from "next/image";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

const OptimizedImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className,
      priority = false,
      quality = 75,
      placeholder = "empty",
      blurDataURL,
      sizes,
      fill = false,
      style,
      ...props
    },
    ref
  ) => {
    if (fill) {
      return (
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          {...(blurDataURL && { blurDataURL })}
          {...(sizes && { sizes })}
          style={style}
          {...props}
        />
      );
    }

    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={cn("object-cover", className)}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        {...(blurDataURL && { blurDataURL })}
        {...(sizes && { sizes })}
        style={style}
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage as Image };
