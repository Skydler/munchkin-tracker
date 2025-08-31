import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Munchkin Tracker",
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
        <div className="navbar bg-gray-800 text-primary-content shadow-sm">
          <div className="flex-1 text-xl">
            <Link href="/">Munchkin Stats Tracker</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Stats</Link>
              </li>
              <li>
                <Link href="/calculator">Battle</Link>
              </li>
              <li>
                <Link href="/rulebook">Rulebook</Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
