"use client";
import { useEffect, useState } from "react";

export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  useEffect(() => {
    if (initialState) {
      setIsLoading(true);
    }
  }, [initialState]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
