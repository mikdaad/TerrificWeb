"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

export default function CountdownTimer() {
  const [remainingTime, setRemainingTime] = useState("Loading...");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Prevent hydration mismatch by waiting for client-side render

    const calculateRemainingTime = () => {
      const targetTime = new Date().setHours(24, 0, 0, 0); // Example: Reset at midnight
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setRemainingTime("00h 00m 00s");
      }
    };

    // Update every second
    const interval = setInterval(calculateRemainingTime, 1000);
    calculateRemainingTime(); // Initial call

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Prevent hydration error by rendering only on the client
  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Timer className="h-4 w-4" />
      <span>{remainingTime} remaining</span>
    </div>
  );
}
