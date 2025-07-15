"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const getCountdown = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = 2 - day;

    const nextTuesday = new Date(today.setDate(today.getDate() + diff));
    nextTuesday.setHours(23, 59, 59, 999);

    const timeDiff = nextTuesday.getTime() - today.getTime();
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

  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        setCountdown(getCountdown());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (countdown.days) {
    return null;
  }

  return (
    <div className="text-center bg-lime-400 p-2">
      <h1>Taco Tuesday ends in...</h1>
      <p className="text-xl font-bold" suppressHydrationWarning={true}>
        {countdown.hours.toString().padStart(2, "0")}:
        {countdown.minutes.toString().padStart(2, "0")}:
        {countdown.seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
