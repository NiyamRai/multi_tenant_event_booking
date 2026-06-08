// app/(sites)/layout.tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../globals.css";
import "@/style/transitions.css";
import "@/style/blog.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Box-Awfis",
  description: "Discover nearby events, book tickets, and download QR passes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={lato.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
