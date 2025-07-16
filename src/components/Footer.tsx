"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WelcomeModal from "./modals/Welcome";

export default function Footer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("hi");
    if (!window.localStorage?.getItem("hasSeenWelcomeModal")) {
      setOpen(true);
      console.log("here!");
      window.localStorage?.setItem("hasSeenWelcomeModal", "true");
    }
  }, [setOpen]);

  return (
    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs">
      <WelcomeModal open={open} setOpen={setOpen} />
      <div className="grid sm:grid-cols-3 max-w-5xl mx-auto gap-2">
        <span>
          <Link
            className="hover:underline focus:underline"
            href="https://coff.ee/nickvanmeter"
          >
            Buy me a 🌮
          </Link>
        </span>
        <span className="text-center">
          <button
            className="hover:underline focus:underline"
            onClick={() => setOpen(true)}
          >
            What is this?
          </button>
        </span>
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/support"
            className="opacity-50 hover:underline focus:underline focus:opacity-100 hover:opacity-100"
          >
            Suggest a video
          </Link>
          <Link
            href="/support?type=takedown"
            className="opacity-50 hover:underline focus:underline focus:opacity-100 hover:opacity-100"
          >
            Request takedown
          </Link>
        </div>
      </div>
    </div>
  );
}
