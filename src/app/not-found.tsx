import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-bubblegum mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h3>
        <p className="text-white/70 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or doesn't exist.
        </p>
        <Link href="/">
          <Button variant="neon" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
