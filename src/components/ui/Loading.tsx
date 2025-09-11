"use client";

import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = "md", text = "Loading...", className }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center space-y-2",
          className
        )}
      >
        <Loader2
          className={cn("animate-spin text-bubblegum", sizeClasses[size])}
        />
        {text && <p className="text-sm text-white/70 animate-pulse">{text}</p>}
      </div>
    );
  }
);

Loading.displayName = "Loading";

const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <Loading size="lg" text="Loading Austin Dest..." />
  </div>
);

interface SectionLoadingProps {
  height?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const SectionLoading = forwardRef<HTMLDivElement, SectionLoadingProps>(
  ({ height = "md", className }, ref) => {
    const heightClasses = {
      sm: "h-48",
      md: "h-96",
      lg: "h-[32rem]",
      xl: "h-[40rem]",
      full: "h-screen",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center py-12",
          heightClasses[height],
          className
        )}
      >
        <Loading size="md" />
      </div>
    );
  }
);

SectionLoading.displayName = "SectionLoading";

export { Loading, PageLoading, SectionLoading };
