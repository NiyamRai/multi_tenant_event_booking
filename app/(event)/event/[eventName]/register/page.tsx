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

const money = (value?: number | null) =>
  value
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value)
    : "Free";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventName } = await params;
  const response = await getEventBySlugOrId(eventName);
  const event = response.data ?? findFallbackEvent(eventName);
  return {
    title: event ? `Register - ${event.eventName}` : "Register",
    description: "Choose a ticket and register for your Box-Awfis event.",
  };
}

export default async function RegisterPage({ params }: Props) {
  const { eventName } = await params;
  const eventResponse = await getEventBySlugOrId(eventName);
  const event = eventResponse.data ?? findFallbackEvent(eventName);

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6">
        <div className="rounded-14 border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black">Event not found</h1>
          <Link
            href="/events_near_by"
            className="mt-5 inline-flex rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white">
            Browse events
          </Link>
        </div>
      </main>
    );
  }

  const ticketResponse = await getTicketsByEventId(event.eventId);
  const tickets =
    ticketResponse.status === 1 && ticketResponse.data?.length
      ? (ticketResponse.data ?? []).filter((ticket) => ticket.isActive !== false)
      : getFallbackTicketsForEvent(event.eventId);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <Link
          href={`/event/${event.eventId}`}
          className="text-sm font-black text-amber-700 transition hover:text-amber-600">
          Back to event
        </Link>

        <div className="mt-6 rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
            Register
          </p>
          <h1 className="mt-2 text-4xl font-black">{event.eventName}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Choose the ticket slab that fits your plan. Free tickets move to
            OTP verification; paid tickets move to payment review.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tickets.length ? (
            tickets.map((ticket) => (
              <Link
                key={ticket.ticketId}
                href={`/event/${event.eventId}/register/${ticket.ticketId}`}
                className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-sm28 text-amber-700">
                      {ticket.ticketPrefix ?? "Ticket"}
                    </p>
                    <h2 className="mt-2 text-2xl font-black">{ticket.ticketName}</h2>
                  </div>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-black text-white">
                    {ticket.isTicketFree ? "Free" : money(ticket.ticketPrice)}
                  </span>
                </div>
                <div className="mt-8 flex items-center justify-between rounded-10 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
                  <span>Available</span>
                  <span>{ticket.availableQuantity ?? 0}</span>
                </div>
                <div className="mt-4 rounded-10 bg-amber-400 px-4 py-3 text-center text-sm font-black text-slate-950">
                  Continue
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-14 border border-dashed border-slate-300 bg-white p-8 text-center md:col-span-2 lg:col-span-3">
              <h2 className="text-2xl font-black">No active tickets yet</h2>
              <p className="mt-2 text-sm text-slate-600">
                Please check back after the organizer publishes ticket slabs.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
