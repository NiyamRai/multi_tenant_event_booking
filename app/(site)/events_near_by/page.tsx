import Link from "next/link";
import React from "react";
import { getPublicEvents } from "@/utils/api/boxOfficeApi";
import { fallbackEvents } from "@/utils/boxOfficeFallback";

interface Props {
  searchParams: Promise<{ cityName?: string; locality?: string }>;
}

const formatDate = (value?: string | null) => {
  if (!value) return "Date announcing soon";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export default async function Page({ searchParams }: Props) {
  const filters = await searchParams;
  const response = await getPublicEvents(filters);
  const events = response.status === 1 && response.data?.length ? response.data : fallbackEvents;
  const cities = Array.from(
    new Set(events.map((event) => event.cityName).filter(Boolean))
  ) as string[];

  return (
    <main className="min-h-screen bg-[#f8fafc] px-6 pb-16 pt-28 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 rounded-14 border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
              Events nearby
            </p>
            <h1 className="mt-2 text-4xl font-black">Pick your next plan</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Browse public Box-Awfis events from the backend, filter by city,
              and move straight into ticket selection.
            </p>
          </div>

          <form className="grid w-full gap-3 sm:grid-cols-2 md:max-w-xl">
            <input
              name="cityName"
              defaultValue={filters.cityName ?? ""}
              placeholder="City"
              className="rounded-10 border border-slate-300 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
            />
            <input
              name="locality"
              defaultValue={filters.locality ?? ""}
              placeholder="Locality"
              className="rounded-10 border border-slate-300 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
            />
            <button className="rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:col-span-2">
              Search events
            </button>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/events_near_by"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700">
            All
          </Link>
          {cities.map((city) => (
            <Link
              href={`/events_near_by?cityName=${encodeURIComponent(city)}`}
              key={city}
              className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-800 transition hover:bg-amber-100">
              {city}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.eventId}
              className="group overflow-hidden rounded-14 border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/9] bg-[linear-gradient(135deg,#0f172a,#334155_55%,#f59e0b)]">
                {event.eventBanner ? (
                  <img
                    src={event.eventBanner}
                    alt={event.eventName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-end p-5 text-white">
                    <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-black backdrop-blur">
                      {event.eventCategory ?? "Event"}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-sm28">
                  <span className="text-amber-700">
                    {event.cityName ?? "City soon"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {event.paidEvent ? "Paid" : "Free"}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-black leading-tight">
                  {event.eventName}
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {formatDate(event.eventDateTime)} · {event.venue ?? event.locality ?? "Venue soon"}
                </p>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                  {event.description ?? "Details are being prepared by the organizer."}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(event.eventTags ?? []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/event/${event.eventId}`}
                  className="mt-6 block rounded-10 bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition group-hover:bg-amber-500 group-hover:text-slate-950">
                  View tickets
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
