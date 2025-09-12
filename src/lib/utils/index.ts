import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return dateString.split("•").reverse().join("-");
}

export function sortGigsByDate(gigs: Array<{ date: string }>, ascending = true) {
  return [...gigs].sort((a, b) => {
    const dateA = Date.parse(formatDate(a.date));
    const dateB = Date.parse(formatDate(b.date));
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function filterUpcomingGigs(gigs: Array<{ date: string }>) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() - 1);
  const currentDate = Date.parse(tomorrow.toString());
  return gigs.filter(gig => Date.parse(formatDate(gig.date)) > currentDate);
}

export function filterPassedGigs(gigs: Array<{ date: string }>) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() - 1);
  const currentDate = Date.parse(tomorrow.toString());
  return gigs.filter(gig => Date.parse(formatDate(gig.date)) < currentDate);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
