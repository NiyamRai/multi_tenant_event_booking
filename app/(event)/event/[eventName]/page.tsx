import { Metadata } from "next";
import Link from "next/link";
import { getEventBySlugOrId, getTicketsByEventId } from "@/utils/api/boxOfficeApi";
import {
  findFallbackEvent,
  getFallbackTicketsForEvent,
} from "@/utils/boxOfficeFallback";

interface Props {
  params: Promise<{ eventName: string }>;
}

const formatDate = (value?: string | null) => {
  if (!value) return "Date announcing soon";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const money = (value?: number | null) =>
  value ? new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value) : "Free";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventName } = await params;
  const response = await getEventBySlugOrId(eventName);
  const event = response.data ?? findFallbackEvent(eventName);

  return {
    title: event?.eventName ?? "Event",
    description: event?.description ?? "Book event tickets on Box-Awfis.",
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { eventName } = await params;
  const eventResponse = await getEventBySlugOrId(eventName);
  const event = eventResponse.data ?? findFallbackEvent(eventName);

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6 text-slate-950">
        <div className="max-w-md rounded-14 border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
            Event not found
          </p>
          <h1 className="mt-2 text-3xl font-black">This event is not live yet</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The backend did not return a matching public event.
          </p>
          <Link
            href="/events_near_by"
            className="mt-6 inline-flex rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white">
            Browse events
          </Link>
        </div>
      </main>
    );
  }

  const ticketResponse = await getTicketsByEventId(event.eventId);
  const tickets =
    ticketResponse.status === 1 && ticketResponse.data?.length
      ? ticketResponse.data
      : getFallbackTicketsForEvent(event.eventId);
  const firstTicket = tickets.find((ticket) => ticket.isActive !== false);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Link
              href="/events_near_by"
              className="text-sm font-black text-amber-300 transition hover:text-amber-200">
              Back to events
            </Link>
            <p className="mt-8 text-sm font-black uppercase tracking-sm28 text-amber-300">
              {event.eventCategory ?? "Box office event"}
            </p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight lg:text-6xl">
              {event.eventName}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
              {event.description ?? "The organizer is still preparing the story for this event."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["When", formatDate(event.eventDateTime)],
                ["Where", event.venue ?? event.locality ?? "Venue soon"],
                ["City", event.cityName ?? "City soon"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-10 border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-sm28 text-amber-200">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-14 border border-white/15 bg-white/10 p-4 shadow-2xl">
            <div className="aspect-[4/3] overflow-hidden rounded-10 bg-[linear-gradient(135deg,#334155,#f59e0b)]">
              {event.eventBanner ? (
                <img
                  src={event.eventBanner}
                  alt={event.eventName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-end p-6">
                  <div>
                    <p className="text-sm font-black uppercase tracking-sm28 text-white/75">
                      Box-Awfis
                    </p>
                    <p className="mt-2 text-3xl font-black">{event.eventName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
                Ticket desk
              </p>
              <h2 className="mt-1 text-3xl font-black">Choose your access</h2>
            </div>
            {firstTicket && (
              <Link
                href={`/event/${event.eventId}/register`}
                className="rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-amber-500 hover:text-slate-950">
                Start booking
              </Link>
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tickets.length ? (
              tickets.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="rounded-10 border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black">{ticket.ticketName}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-500">
                        {ticket.ticketPrefix ?? "BOX"} pass
                      </p>
                    </div>
                    <p className="rounded-full bg-white px-3 py-1 text-sm font-black text-slate-950 shadow-sm">
                      {ticket.isTicketFree ? "Free" : money(ticket.ticketPrice)}
                    </p>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{
                        width: `${Math.max(
                          8,
                          Math.min(
                            100,
                            ((ticket.availableQuantity ?? 0) /
                              Math.max(ticket.ticketQuantity ?? 1, 1)) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-600">
                    {ticket.availableQuantity ?? 0} of {ticket.ticketQuantity ?? 0} available
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-10 border border-dashed border-slate-300 bg-slate-50 p-8 text-center md:col-span-2">
                <h3 className="text-xl font-black">Tickets are being configured</h3>
                <p className="mt-2 text-sm text-slate-600">
                  The event is live, but no active ticket slab came back from the backend yet.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
            Booking flow
          </p>
          <div className="mt-5 space-y-4">
            {["Select ticket", "Enter attendee details", "Verify OTP or await payment review", "Download QR pass"].map(
              (item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-bold text-slate-700">{item}</p>
                </div>
              )
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
