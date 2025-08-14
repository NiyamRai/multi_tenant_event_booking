"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

export default function AdminNavbar() {
  const location = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isAnimateNavButton, setAnimateNavButton] = useState(false);

  const navOptions = [
    { name: "Home", link: "/admin" },
    { name: "About us", link: "/admin/about-us" },
    { name: "Facilities", link: "/admin/facilities" },
    { name: "Our Management", link: "/admin/management" },
    { name: "Gallery", link: "/admin/gallery" },
    { name: "News & Events", link: "/admin/news-n-events" },
    { name: "Contact Us", link: "/admin/contact-us" },
  ];

  const handleToggleNav = () => {
    setNavOpen((prev) => !prev);
    setAnimateNavButton(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        // you can keep something if you want to react on resize
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  // Find current page name based on location
  const currentPageName =
    navOptions.find((option) => option.link === location)?.name || "Home";

  return (
    <nav className="lg:ml-64 py-3 border-l-4 border-l-primary-max h-20 relative text-center shadow-xl shadow-[rgba(0, 0, 0, 0.15)] font-outfit top-0 flex items-center max-md:flex-col z-10 bg-white justify-between text-black">
      {/* Background Overlay when nav is open */}
      {isNavOpen && (
        <div
          className="w-full h-screen absolute items-center top-0 left-0 bg-white text-black z-10"
          style={{ pointerEvents: "none" }}
          onClick={handleToggleNav}></div>
      )}

      <div className="flex w-full items-center justify-between px-4 z-10">
        {/* Logo (only mobile) */}
        <div className="flex items-center lg:hidden">
          <img
            src="/images/banner_logo.png"
            alt="Sharjah Cricket Stadium"
            className="w-12 h-12"
          />
        </div>

        {/* Dynamic Page Title */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <span className="font-extrabold text-2xl">{currentPageName}</span>
        </div>

        {/* Profile */}
        <div className="hidden lg:flex items-center gap-4">
          <span>Hi, Niyam</span>
        </div>

        {/* Dropdown toggle (only mobile) */}
        <div
          className={
            "flex flex-col w-max gap-[7px] lg:hidden text-black cursor-pointer " +
            (isNavOpen
              ? " h-8 justify-center items-center text-black relative w-8"
              : "")
          }
          onClick={handleToggleNav}>
          <div
            className={
              "w-7 h-[2px] rounded-full bg-black " +
              (isNavOpen
                ? " rotateRightDiagonal absolute "
                : isAnimateNavButton
                ? " unwindRightDiagonal"
                : "")
            }></div>

          {!isNavOpen && (
            <div
              className={
                "w-7 h-[2px] rounded-full bg-black " +
                (isAnimateNavButton ? " expand-horizontal" : "")
              }></div>
          )}
          <div
            className={
              "w-7 h-[2px] rounded-full bg-black " +
              (isNavOpen
                ? " rotateLeftDiagonal absolute "
                : isAnimateNavButton
                ? " unwindLeftDiagonal"
                : "")
            }></div>
        </div>
      </div>

      {/* Nav items for mobile dropdown */}
      {isNavOpen && (
        <motion.div
          className="flex w-full md:justify-between items-center bg-white max-lg:text-sm text-black max-md:flex-col gap-4 mt-6 font-medium z-20"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
          }}>
          <ul className="flex gap-10 max-lg:gap-6 items-center lg:ml-20 mt-8 capitalize text-black max-md:flex-col max-md:items-center max-md:justify-center">
            {navOptions.map((option, i) => (
              <li
                key={i}
                className={location === option.link ? "font-bold" : ""}>
                <Link href={option.link}>{option.name}</Link>
              </li>
            ))}
            {/* <li className="text-primary border border-primary py-2 px-5 text-black">
              <Link href={"/contact-us"}>Contact Us</Link>
            </li> */}
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
