import Link from "next/link";
import React from "react";

export default function Page() {
  const cities = [
    "Bengaluru",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Hyderabad",
  ];
  const events = [
    {
      title: "Tech Conference 2025",
      date: "20 Aug, 2025",
      location: "Bengaluru",
      description:
        "Join industry leaders for an insightful day of networking and talks.",
    },
    {
      title: "BlueMoonProductions",
      date: "25 Aug, 2025",
      location: "Delhi",
      description:
        "Watch the most promising startups pitch their ideas to investors.",
    },
    {
      title: "StarlineEvents",
      date: "30 Aug, 2025",
      location: "Mumbai",
      description:
        "Experience an unforgettable night with top artists performing live.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 flex flex-col items-center mt-20">
      {/* City Filter Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {cities.map((city, index) => (
          <div
            key={index}
            className="px-4 py-2 rounded-xl border border-brand-primary-300 bg-brand-primary-50 text-brand-primary-700 cursor-pointer hover:bg-brand-primary-100 transition">
            {city}
          </div>
        ))}
      </div>

      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-foreground text-background rounded-2xl shadow-lg p-6 hover:scale-105 transition">
            <h2 className="text-xl font-bold text-brand-primary-600">
              {event.title}
            </h2>
            <p className="text-sm text-brand-secondary-600 mt-1">
              {event.date} • {event.location}
            </p>
            <p className="mt-3 text-sm">{event.description}</p>
            <Link
              href={`/event/${event.title}`}
              className="mt-4 px-4 py-2 rounded-lg bg-brand-primary-500 text-white hover:bg-brand-primary-600 transition">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
