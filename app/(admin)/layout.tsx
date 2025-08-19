// app/(admin)/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import { Lato } from "next/font/google";
import "@/style/blog.css";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import AdminFooter from "@/components/AdminFooter";
import ProtectedRoute from "./client/ProtectedRoute";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Admin : Sharjah Cricket Stadium",
  description: "Sharjah Cricket Stadium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${lato.className} bg-[#F0F2F5]`}>
      <AdminNavbar />
      <AdminSidebar />
      <ProtectedRoute>{children}</ProtectedRoute>
      <AdminFooter />
    </div>
  );
}
