"use client";

import { useEffect, useState } from "react";

type HoursMinutesSeconds = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown() {
  const getCountdown = (): HoursMinutesSeconds => {
    const nextWednesday = new Date();
    nextWednesday.setDate(
      nextWednesday.getDate() + ((3 + 7 - nextWednesday.getDay()) % 7 || 7)
    );
    nextWednesday.setHours(0, 0, 0, 0);

    const timeDiff = nextWednesday.getTime() - Date.now();

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [countdown, setCountdown] = useState<HoursMinutesSeconds | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        setCountdown(getCountdown());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!countdown || countdown.days > 0) {
    return null;
  }

  return (
    <div className="text-center bg-lime-400 p-2 animate-slidedown ">
      <h1>Taco Tuesday ends in...</h1>
      <p className="text-xl font-bold">
        {countdown.hours.toString().padStart(2, "0")}:
        {countdown.minutes.toString().padStart(2, "0")}:
        {countdown.seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
