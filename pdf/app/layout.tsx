import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GeistSans } from 'geist/font/sans';


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "PlayPdf",
  description: "create practical files easily",
  
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <main className="flex flex-col">
        <Navbar/>
        {children}
        </main>
        </body>
    </html>
  );
}
