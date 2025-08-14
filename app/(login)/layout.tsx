import type { Metadata } from "next";
import "../globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Admin : Shahjah Cricket Stadium",
  description: "Shahjah Cricket Stadium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className + " bg-[#F0F2F5]"}>{children}</body>
    </html>
  );
}
