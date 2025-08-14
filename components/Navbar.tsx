"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNo } from "@/utils/constants";

export default function Navbar() {
  const [width, setWidth] = useState(0);
  const location = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isAnimateNavButton, setAnimateNavButton] = useState(false);
  const navOptions = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "Gallery",
      link: "/gallery",
    },
  ];
  const handleToggleNav = () => {
    setNavOpen((prev) => !prev);
    setAnimateNavButton(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Function to update width on resize
      const handleResize = () => setWidth(window.innerWidth);

      // Set initial width
      setWidth(window.innerWidth);

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Timeout to close nav
      const timeOut = setTimeout(() => {
        if (isNavOpen) {
          setNavOpen(false);
        }
      }, 10000);

      // Cleanup function
      return () => {
        clearTimeout(timeOut);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isNavOpen]);

  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  return (
    <nav
      className={
        " bg-black w-full py-6 relative text-center font-outfit top-0 2xl:px-16 xl:px-20 xl:pr24 md:px-10 flex items-center max-md:flex-col max-md:px-[5vw] z-10    text-white  "
      }>
      {/*=====================  Background Overlay when nav is open ========================== */}
      {isNavOpen && (
        <div
          className="w-full h-screen absolute items-center  top-0 left-0 bg-black/25"
          onClick={handleToggleNav}></div>
      )}
      <div className="flex max-md:w-full justify-between items-center z-10">
        <Link href={"/"}>
          <Image
            width={500}
            height={500}
            src="/images/logo.png"
            alt=""
            className="md:w-[4rem]  max-md:w-[2.5rem] "
          />
        </Link>
        {/*=====================  Open nav with cross transition ========================== */}
        <div
          className={
            "flex flex-col w-max gap-[7px] md:hidden cursor-pointer " +
            (isNavOpen
              ? " h-8 justify-center items-center relative w-8 mr-4"
              : "")
          }
          onClick={handleToggleNav}>
          <div
            className={
              "w-7 h-[2px] rounded-full bg-black " +
              (isNavOpen
                ? " rotateRightDiagonal  absolute "
                : isAnimateNavButton
                ? " unwindRightDiagonal"
                : "")
            }></div>

          {!isNavOpen && (
            <div
              className={
                "w-7 h-[2px] rounded-full bg-black false" +
                (isNavOpen
                  ? "  "
                  : isAnimateNavButton
                  ? " expand-horizontal"
                  : "")
              }></div>
          )}

          <div
            className={
              "w-7 h-[2px] rounded-full bg-black " +
              (isNavOpen
                ? " rotateLeftDiagonal  absolute "
                : isAnimateNavButton
                ? " unwindLeftDiagonal"
                : "")
            }></div>
        </div>
        {/*=====================  Close nav with cross transition ========================== */}
      </div>
      {/* Nav items */}
      {(width > 768 || isNavOpen) && (
        <div
          className={
            "flex w-full   md:justify-between items-center max-lg:text-sm   max-md:flex-col gap-4 max-md:pb-8 max-md:pt-28 font-medium   " +
            (isNavOpen
              ? "absolute top-0  bg-neutral-50 navSlideDown shadow-sm "
              : "")
          }>
          <ul className="flex gap-10 max-lg:gap-6 items-center  lg:ml-20 capitalize  max-md:flex-col max-md:items-center max-md:justify-center ">
            {navOptions.map((option, i) => (
              <li
                key={i}
                className={
                  location === option.link
                    ? " border-b transition-all ease-in-out font-bold"
                    : ""
                }>
                <Link href={option.link}>{option.name}</Link>
              </li>
            ))}
          </ul>
          <div className=" flex gap-4 items-center font-semibold">
            <Link
              href={"/contact-us"}
              className=" py-2 px-5 bg-white text-primary-max rounded">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
