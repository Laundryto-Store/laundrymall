"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (Sentry is automatically capturing this, but good to log)
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-red-50 text-red-500 p-4 rounded-full mb-6">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong!</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an unexpected error while loading this page. Our team has been automatically notified.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
