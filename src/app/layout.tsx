import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Countdown from "@/components/Countdown";
import { NotificationProvider } from "@/providers/Notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tacotok",
  description:
    "Diversify your Taco Tuesday with a new recipe featured weekly 🌮",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <div className="flex flex-col min-h-full">
            <Header />
            <Countdown />
            <div className="grow md:pt-4 lg:pt-8 pb-16 flex flex-col">
              {children}
            </div>
            <div className="px-4 py-2 border-t border-gray-200 text-center bg-gray-50 text-xs">
              <div className="flex justify-between max-w-5xl mx-auto">
                <span>
                  <Link
                    className="hover:underline focus:underline"
                    href="https://coff.ee/nickvanmeter"
                  >
                    Buy me 🌮
                  </Link>
                </span>
                <div className="flex items-center justify-between gap-4">
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
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
