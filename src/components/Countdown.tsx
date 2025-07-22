"use client";

import getDenverDate from "@/utils/getDenverDate";
import { useEffect, useState } from "react";

type HoursMinutesSeconds = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown() {
  const getCountdown = (): HoursMinutesSeconds => {
    const now = new Date();
    const denverNow = getDenverDate(now);

    const denverWeekday = denverNow.getUTCDay();
    const daysUntilNextWednesday = (3 + 7 - denverWeekday) % 7 || 7;

    const nextWednesday = new Date(
      Date.UTC(
        denverNow.getUTCFullYear(),
        denverNow.getUTCMonth(),
        denverNow.getUTCDate() + daysUntilNextWednesday,
        0,
        0,
        0,
        0
      )
    );

    const diffMs = nextWednesday.getTime() - denverNow.getTime();

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
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
      <h1>New recipe drop in...</h1>
      <p className="text-xl font-bold">
        {countdown.hours.toString()}:
        {countdown.minutes.toString().padStart(2, "0")}:
        {countdown.seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
