"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";
import Image from "next/image";
import { IoMdClose, IoMdMenu } from "react-icons/io";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuControlRef = useRef<HTMLButtonElement | null>(null);
  const renderRef = useRef<boolean>(false);
  useEffect(() => {
    if (!renderRef.current) {
      renderRef.current = true;
      return;
    }

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      mobileMenuRef.current?.querySelector("a")?.focus();
    } else {
      document.body.style.overflow = "auto";
      mobileMenuControlRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <div className="px-4 shadow sticky top-0 left-0 right-0 bg-white z-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 max-w-5xl mx-auto items-center">
        <div className="hidden sm:block">
          <Link
            href="/"
            className={cn(
              "p-4 hover:bg-lime-100 focus:bg-lime-100 inline-block transition-colors border-b-2 border-b-transparent",
              "focus:border-b-lime-600 hover:border-lime-600",
              pathname === "/" && "border-b-lime-400"
            )}
          >
            🌮 Weekly Feature
          </Link>
        </div>
        <div className="text-center inline-block sm:m-auto p-3 px-0 sm:p-0">
          <Link href="/">
            <Image
              src="/logo-black.png"
              width={150}
              height={75}
              alt="Tacotok"
            />
          </Link>
        </div>
        <div className="text-right hidden sm:block">
          <Link
            href="/archive"
            className={cn(
              "p-4 hover:bg-lime-100 focus:bg-lime-100 inline-block transition-colors border-b-2 border-b-transparent",
              "focus:border-b-lime-600 hover:border-lime-600",
              pathname === "/archive" && "border-b-lime-400"
            )}
          >
            🗃️ Archives
          </Link>
        </div>
        <div className="block sm:hidden text-right col-start-2">
          <button
            ref={mobileMenuControlRef}
            className="p-4 -mr-4"
            onClick={() => setMenuOpen(true)}
          >
            <IoMdMenu className="w-5 h-5" />
            <span className="sr-only">Menu</span>
          </button>
          <div
            ref={mobileMenuRef}
            className={cn(
              "text-left p-4 fixed top-0 left-0 right-0 bottom-0 bg-white/90 z-20",
              "transition-transform",
              "duration-300",
              "ease-in-out",
              menuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <button onClick={() => setMenuOpen(false)}>
              <IoMdClose className="w-5 h-5" />
              <span className="sr-only">Close menu</span>
            </button>
            <ul>
              <li>
                <Link href="/" className="py-4 block">
                  🌮 Weekly Feature
                </Link>
              </li>
              <li>
                <Link href="/archive" className="py-4 block">
                  🗃️ Archives
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
