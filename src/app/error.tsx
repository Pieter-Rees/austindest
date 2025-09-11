"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-white/70 mb-8">
          We're sorry, but something unexpected happened.
        </p>
        <Button onClick={reset} variant="neon" size="lg">
          Try again
        </Button>
      </div>
    </div>
  );
}
