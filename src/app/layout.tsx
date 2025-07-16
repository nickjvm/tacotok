import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Countdown from "@/components/Countdown";
import { NotificationProvider } from "@/providers/Notifications";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
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
            <Footer />
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
