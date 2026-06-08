"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getEventById, getUserTickets } from "@/utils/api/boxOfficeApi";
import { BookedTicket, BoxOfficeEvent } from "@/utils/types/boxOffice";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  PENDING_OTP: "bg-amber-100 text-amber-800",
  PENDING_PAYMENT: "bg-sky-100 text-sky-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-slate-200 text-slate-700",
};

function PassContent() {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId") ?? "";
  const email = searchParams.get("email") ?? "";
  const ticketCode = searchParams.get("ticketCode") ?? "";
  const [ticket, setTicket] = useState<BookedTicket | null>(null);
  const [event, setEvent] = useState<BoxOfficeEvent | null>(null);
  const [lookupEmail, setLookupEmail] = useState(email);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("boxawfis-last-ticket");
    if (stored) {
      const parsed = JSON.parse(stored) as BookedTicket;
      setTicket(parsed);
      if (!lookupEmail) setLookupEmail(parsed.email);
    }
  }, [lookupEmail]);

  useEffect(() => {
    if (!ticket?.eventId) return;
    getEventById(ticket.eventId).then((response) => {
      if (response.status === 1) setEvent(response.data);
    });
  }, [ticket?.eventId]);

  useEffect(() => {
    if (!tenantId || !email) return;
    setLoading(true);
    getUserTickets(tenantId, email).then((response) => {
      setLoading(false);
      if (response.status !== 1) return;
      const match =
        response.data?.find((item) => item.ticketCode === ticketCode) ??
        response.data?.[0] ??
        null;
      if (match) {
        setTicket(match);
        sessionStorage.setItem("boxawfis-last-ticket", JSON.stringify(match));
      }
    });
  }, [email, tenantId, ticketCode]);

  const qrValue = useMemo(() => {
    if (!ticket) return "";
    return JSON.stringify({
      ticketCode: ticket.ticketCode,
      name: ticket.fullName,
      email: ticket.email,
      status: ticket.bookingStatus,
    });
  }, [ticket]);

  const downloadPDF = async () => {
    if (!ticket) return;

    const doc = new jsPDF();
    const title = event?.eventName ?? "Box-Awfis Pass";
    const qrData = await QRCode.toDataURL(qrValue);

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 55, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(title, 16, 24, { maxWidth: 145 });
    doc.setFontSize(11);
    doc.text("Box-Awfis digital pass", 16, 39);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.text(`Ticket: ${ticket.ticketCode}`, 16, 76);
    doc.text(`Name: ${ticket.fullName}`, 16, 88);
    doc.text(`Email: ${ticket.email}`, 16, 100);
    doc.text(`Mobile: ${ticket.mobile}`, 16, 112);
    doc.text(`Status: ${ticket.bookingStatus.replaceAll("_", " ")}`, 16, 124);
    doc.addImage(qrData, "PNG", 145, 72, 42, 42);

    doc.save(`${ticket.ticketCode}_BoxAwfis_Pass.pdf`);
  };

  const searchTickets = async () => {
    if (!tenantId || !lookupEmail) {
      toast.error("Tenant ID and email are required to fetch backend tickets");
      return;
    }

    setLoading(true);
    const response = await getUserTickets(tenantId, lookupEmail);
    setLoading(false);

    if (response.status !== 1 || !response.data?.length) {
      toast.error("No tickets found for this email");
      return;
    }

    const match = response.data.find((item) => item.ticketCode === ticketCode) ?? response.data[0];
    setTicket(match);
    sessionStorage.setItem("boxawfis-last-ticket", JSON.stringify(match));
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-6 py-10 text-slate-950">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
            Your pass
          </p>
          <h1 className="mt-2 text-4xl font-black">
            {event?.eventName ?? "Box-Awfis ticket"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Confirmed tickets can be downloaded as a QR-ready PDF. Pending
            tickets stay visible here while OTP or payment review is completed.
          </p>

          {ticket ? (
            <div className="mt-8 overflow-hidden rounded-14 border border-slate-200 bg-slate-950 text-white shadow-xl">
              <div className="bg-[linear-gradient(135deg,#0f172a,#183b56_60%,#f59e0b)] p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-sm28 text-white/60">
                      Ticket code
                    </p>
                    <h2 className="mt-2 text-4xl font-black">{ticket.ticketCode}</h2>
                    <p className="mt-2 text-sm font-bold text-white/70">
                      {ticket.ticket?.ticketName ?? "Event pass"}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-4 py-2 text-xs font-black ${
                      statusStyles[ticket.bookingStatus] ?? "bg-white text-slate-950"
                    }`}>
                    {ticket.bookingStatus.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 bg-white p-6 text-slate-950 sm:grid-cols-2">
                {[
                  ["Name", ticket.fullName],
                  ["Email", ticket.email],
                  ["Mobile", ticket.mobile],
                  ["Payment", ticket.paymentVerified ? "Verified" : "Not verified"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-10 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-sm28 text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-14 border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <h2 className="text-2xl font-black">No pass loaded yet</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Book a ticket first, or fetch existing tickets by tenant and email.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
            Tools
          </p>
          <label className="mt-5 flex flex-col gap-2 text-sm font-black text-slate-700">
            Email
            <input
              value={lookupEmail}
              onChange={(eventValue) => setLookupEmail(eventValue.target.value)}
              className="rounded-10 border border-slate-300 px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
            />
          </label>
          <button
            onClick={searchTickets}
            disabled={loading}
            className="mt-3 w-full rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50">
            {loading ? "Fetching..." : "Fetch tickets"}
          </button>
          <button
            onClick={downloadPDF}
            disabled={!ticket}
            className="mt-3 w-full rounded-10 bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:opacity-50">
            Download PDF
          </button>
          <Link
            href="/events_near_by"
            className="mt-3 block rounded-10 border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700">
            Browse more events
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default function PassPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f8fafc]" />}>
      <PassContent />
    </Suspense>
  );
}
