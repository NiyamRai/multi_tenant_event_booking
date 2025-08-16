"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const location = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load stored theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navOptions = [{ name: "Home", link: "/" }];

  return (
    <nav className="w-full   fixed top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            width={80}
            height={80}
            src="/images/logo.png"
            alt="Boxawfis Logo"
            className="cursor-pointer"
          />
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8 items-center text-gray-800 dark:text-gray-200 font-medium">
          {navOptions.map((option, i) => (
            <li
              key={i}
              className={`${
                location === option.link
                  ? "font-bold border-b-2 border-brand-primary-500"
                  : ""
              } hover:text-brand-primary-500 transition`}>
              <Link href={option.link}>{option.name}</Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-6 px-3 py-2 rounded-md bg-brand-primary-500 text-white hover:bg-brand-primary-600 transition">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}
