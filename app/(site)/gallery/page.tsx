"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <div className="min-h-screen w-full xl:px-24 px-4 pb-44">
      <div className="w-full flex flex-col justify-center items-center text-center lg:mt-14 md:mt-9 mt-7">
        <p className="font-normal font-base text-blue-950 italic text-base bg-blue-100 py-1 px-4 rounded-md">
          Our Gallery
        </p>
        <p className="text-center text-4xl lg:text-[56px] md:text-5xl font-bold text-black lg:mt-4 md:mt-5 mt-4">
          Celebrating Sports Through
        </p>
        <p className="text-center text-4xl lg:text-[56px] md:text-5xl font-bold text-black">
          Every Snapshot
        </p>
        <div className="md:pt-6 pt-3 flex items-center space-x-2">
          <Link
            href="/"
            className="lg:text-lg md:text-base text-sm font-medium [letter-spacing:2%]">
            Home
          </Link>
          <span>{">"}</span>
          <p className="lg:text-lg md:text-base text-sm font-medium [letter-spacing:2%]">
            Gallery
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center w-full xl:mt-24 mt-16">
          <div className="hidden md:flex items-start">
            <Link
              href="/gallery?category=1"
              className="bg-[#083A7F] text-sm lg:text-base text-white font-semibold px-4 py-2 rounded-md">
              {" "}
              All
            </Link>
            <Link
              href="/gallery?category=2"
              className="text-sm lg:text-base font-semibold px-4 py-2 pr-4">
              {" "}
              International Tornaments
            </Link>
            <Link
              href="/gallery?category=3"
              className="text-sm lg:text-base font-semibold px-4 py-2">
              {" "}
              Events
            </Link>
            <Link
              href="/gallery?category=4"
              className="text-sm lg:text-base font-semibold px-4 py-2">
              {" "}
              Domestic Tournaments
            </Link>
            <Link
              href="/gallery?category=5"
              className="text-sm lg:text-base font-semibold px-4 py-2">
              {" "}
              Others
            </Link>
          </div>
          <div>
            <select className="md:hidden text-sm outline bg-[#083A7F] text-white font-semibold w-20 border-blue-900 rounded-lg py-2 px-4">
              <option value="1">All</option>
              <option value="2">International Tornaments</option>
              <option value="3">Events</option>
              <option value="4">Domestic Tournaments</option>
              <option value="5">Others</option>
            </select>
          </div>
        </div>
        {/* Animated Image Grid */}
        <motion.div
          className="columns-2 sm:columns-3 md:columns-4 gap-3 lg:mt-14 mt-10"
          initial="hidden"
          animate="show"></motion.div>
      </div>
    </div>
  );
}
