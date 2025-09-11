"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface TitleProps {
  title?: string;
  subtitle?: string;
  subTitle?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  left?: boolean;
  center?: boolean;
  right?: boolean;
  margin?: boolean;
  className?: string;
}

const Title = forwardRef<HTMLDivElement, TitleProps>(
  (
    {
      title,
      subtitle,
      subTitle,
      align,
      size = "xl",
      left,
      center,
      right,
      margin = false,
      className,
      ...props
    },
    ref
  ) => {
    const alignment =
      align || (left ? "left" : center ? "center" : right ? "right" : "center");

    const sizeClasses = {
      sm: "text-3xl sm:text-4xl lg:text-5xl",
      md: "text-4xl sm:text-5xl lg:text-6xl",
      lg: "text-5xl sm:text-6xl lg:text-7xl",
      xl: "text-6xl sm:text-7xl lg:text-8xl",
    };

    const subtitleSizeClasses = {
      sm: "text-lg sm:text-xl lg:text-2xl",
      md: "text-xl sm:text-2xl lg:text-3xl",
      lg: "text-2xl sm:text-3xl lg:text-4xl",
      xl: "text-3xl sm:text-4xl lg:text-5xl",
    };

    return (
      <div
        ref={ref}
        className={cn("w-full", `text-${alignment}`, className)}
        {...props}
      >
        {title && (
          <h1
            className={cn(
              "font-sans font-light text-foreground tracking-tight",
              sizeClasses[size],
              `text-${alignment}`,
              "animate-fade-in"
            )}
          >
            {title}
          </h1>
        )}
        {(subtitle || subTitle) && (
          <h2
            className={cn(
              "font-sans font-normal text-muted tracking-wide",
              subtitleSizeClasses[size],
              `text-${alignment}`,
              margin && "mt-4",
              "animate-slide-up"
            )}
          >
            {subtitle || subTitle}
          </h2>
        )}
      </div>
    );
  }
);

Title.displayName = "Title";

export { Title };
