"use client";

import getDenverDate from "@/utils/getDenverDate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";

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
    const daysUntilNextTuesday = (2 + 7 - denverWeekday) % 7 || 7;

    const nextTuesday = new Date(
      Date.UTC(
        denverNow.getUTCFullYear(),
        denverNow.getUTCMonth(),
        denverNow.getUTCDate() + daysUntilNextTuesday,
        0,
        0,
        0,
        0
      )
    );

    const diffMs = nextTuesday.getTime() - denverNow.getTime();

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
    <div className="text-center bg-lime-400 p-2 animate-slidedown flex flex-col items-center justify-center ">
      <div className="flex gap-2">
        <h1>New recipe drop in </h1>
        <p className="font-bold">
          {countdown.hours.toString()}:
          {countdown.minutes.toString().padStart(2, "0")}:
          {countdown.seconds.toString().padStart(2, "0")}
        </p>
      </div>
      <Link
        href="/preview"
        className="z-0 relative inline-flex items-center gap-2 mt-1 text-sm underline hover:no-underline before:content-[''] before:absolute before:-top-0.5 before:-left-1 before:-bottom-0.5 before:right-full opacity-100 hover:before:-right-0.5 hover:before:bg-white hover:before:z-[-1] before:transition-all opacity-100;"
      >
        Get a sneak peek <GoArrowRight />
      </Link>
    </div>
  );
}
