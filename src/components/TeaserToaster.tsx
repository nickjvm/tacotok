"use client";

import { useCallback, useEffect, useState } from "react";
import getDenverDate from "@/utils/getDenverDate";
import Image from "next/image";
import asset from "@/utils/asset";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";

type HoursMinutesSeconds = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function TeaserToaster({ recipe }: { recipe?: Recipe | null }) {
  const [closed, setClosed] = useState(true);
  const [countdown, setCountdown] = useState<HoursMinutesSeconds | null>(null);

  useEffect(() => {}, []);

  const getCountdown = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (!recipe) {
      return;
    }

    if (typeof window !== "undefined") {
      setClosed(document.cookie.includes("teaserClosed"));

      const countdown = getCountdown();

      if (countdown.days > 3) {
        setCountdown(countdown);
        return;
      }

      const interval = setInterval(() => {
        setCountdown(getCountdown());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [getCountdown, recipe]);

  const plural = (str: string, n: number) => (n === 1 ? str : `${str}s`);

  const onClose = () => {
    document.cookie = `teaserClosed=true; path=/; max-age=${60 * 60 * 24 * 4}`;
    setClosed(true);
  };

  if (!countdown || !recipe || closed) {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 sm:left-auto shadow sm:max-w-sm bg-white ">
      <div className="flex items-center justify-between bg-lime-300 px-4 py-2 text-center font-bold text-sm">
        🌮 Taco Tuesday is in{" "}
        {countdown.days > 0 &&
          `${countdown.days} ${plural("day", countdown.days)}!`}
        {countdown.days <= 0 &&
          `${countdown.hours} ${plural("hr", countdown.hours)}, ${
            countdown.minutes
          } ${plural("min", countdown.minutes)}, ${countdown.seconds} ${plural(
            "sec",
            countdown.seconds
          )}`}
        <button
          className="ml-auto opacity-30 hover:opacity-100 transition"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <IoMdClose className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="grid gap-4 grid-cols-4">
          <div className="aspect-square relative col-span-1">
            <Image
              src={asset(recipe.imageKey)}
              alt={recipe.title}
              fill
              className="rounded"
            />
          </div>
          <div className="col-span-3 flex flex-col">
            <p className="text-sm text-gray-600">👀 Next up</p>
            <h3 className="text-base font-bold">{recipe.title}</h3>
            <Link
              href="/preview"
              className="self-start relative inline-flex items-center gap-2 mt-1 text-sm underline hover:no-underline before:content-[''] before:absolute before:-top-0.5 before:-left-1 before:-bottom-0.5 before:right-full opacity-100 hover:before:-right-0.5 hover:before:bg-lime-300 hover:before:z-[-1] before:transition-all opacity-100;"
            >
              Get a sneak peek <GoArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
