"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log("Navigation timing:", {
              domContentLoaded:
                navEntry.domContentLoadedEventEnd -
                navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
            });
          }

          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }

          if (entry.entryType === "first-input") {
            const inputEntry = entry as PerformanceEventTiming;
            console.log(
              "FID:",
              inputEntry.processingStart - inputEntry.startTime
            );
          }
        }
      });

      observer.observe({
        entryTypes: ["navigation", "largest-contentful-paint", "first-input"],
      });

      return () => {
        observer.disconnect();
      };
    }

    return undefined;
  }, []);

  return null;
}
