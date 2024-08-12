import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/Navigation/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recepty",
  description: "Stránka na správu domácích receptů",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-blue-950"}>
        <NavBar />
        <main className="h-screen w-full mt-20">{children}</main>
      </body>
    </html>
  );
}
