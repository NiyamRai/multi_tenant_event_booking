import Link from "next/link";
import { getEventBySlugOrId, getTicketsByEventId } from "@/utils/api/boxOfficeApi";
import {
  findFallbackEvent,
  getFallbackTicketsForEvent,
} from "@/utils/boxOfficeFallback";
import BookingForm from "./BookingForm";

interface Props {
  params: Promise<{ eventName: string; optionName: string }>;
}

export default async function RegisterFormPage({ params }: Props) {
  const { eventName, optionName } = await params;
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
      ? ticketResponse.data
      : getFallbackTicketsForEvent(event.eventId);
  const ticket =
    tickets.find((item) => String(item.ticketId) === optionName) ??
    tickets.find(
      (item) =>
        item.ticketName?.toLowerCase().replace(/\s+/g, "") ===
        decodeURIComponent(optionName).toLowerCase().replace(/\s+/g, "")
    );

  if (!ticket) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6">
        <div className="rounded-14 border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black">Ticket not found</h1>
          <Link
            href={`/event/${event.eventId}/register`}
            className="mt-5 inline-flex rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white">
            Choose another ticket
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <Link
          href={`/event/${event.eventId}/register`}
          className="text-sm font-black text-amber-700 transition hover:text-amber-600">
          Back to tickets
        </Link>
        <div className="mt-6">
          <BookingForm event={event} ticket={ticket} />
        </div>
      </section>
    </main>
  );
}
