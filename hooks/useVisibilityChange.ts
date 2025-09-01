import { useEffect, useState } from "react";

export function useVisibilityChange(): boolean {
  // Initialize with current visibility state
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Check if we're in a browser environment
    if (typeof document === "undefined") {
      return true; // Default to visible for SSR
    }

    return !document.hidden;
  });

  useEffect(() => {
    // Check if Page Visibility API is supported
    if (
      typeof document === "undefined" ||
      typeof document.hidden === "undefined"
    ) {
      // Page Visibility API not supported, assume always visible
      return;
    }

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Add event listener for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup: remove event listener on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
