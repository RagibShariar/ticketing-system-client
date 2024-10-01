import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solar-ICT",
  description: "Solar-ICT | Service Request",
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
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors />
        </StoreProvider>
      </body>
    </html>
  );
}
