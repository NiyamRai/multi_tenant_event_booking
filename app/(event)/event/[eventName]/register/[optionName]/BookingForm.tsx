"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { bookTicket, verifyBookingOtp } from "@/utils/api/boxOfficeApi";
import { BookedTicket, BoxOfficeEvent, Ticket } from "@/utils/types/boxOffice";

interface Props {
  event: BoxOfficeEvent;
  ticket: Ticket;
}

const money = (value?: number | null) =>
  value
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value)
    : "Free";

export default function BookingForm({ event, ticket }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    paymentProofUrl: "",
  });
  const [otp, setOtp] = useState("");
  const [booking, setBooking] = useState<BookedTicket | null>(null);
  const [loading, setLoading] = useState(false);

  const isFree = ticket.isTicketFree || !ticket.ticketPrice;
  const canSubmit = useMemo(
    () => form.fullName && form.email && form.mobile && (isFree || form.paymentProofUrl),
    [form, isFree]
  );

  const handleBook = async (eventValue: FormEvent) => {
    eventValue.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    const response = await bookTicket(event.tenantId, {
      ticketId: ticket.ticketId,
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      paymentProofUrl: form.paymentProofUrl,
    });
    setLoading(false);

    if (response.status !== 1) {
      toast.error(typeof response.error === "string" ? response.error : "Booking failed");
      return;
    }

    setBooking(response.data);
    sessionStorage.setItem("boxawfis-last-ticket", JSON.stringify(response.data));

    if (response.data.bookingStatus === "PENDING_PAYMENT") {
      toast.success("Booking submitted for payment review");
      router.push(
        `/event/${event.eventId}/pass?tenantId=${event.tenantId}&email=${encodeURIComponent(
          form.email
        )}&ticketCode=${response.data.ticketCode}`
      );
    } else {
      toast.success("OTP sent. Verify to confirm your pass.");
    }
  };

  const handleVerify = async () => {
    if (!booking?.ticketCode || !otp) return;

    setLoading(true);
    const response = await verifyBookingOtp(event.tenantId, {
      ticketCode: booking.ticketCode,
      otp,
    });
    setLoading(false);

    if (response.status !== 1) {
      toast.error(typeof response.error === "string" ? response.error : "OTP verification failed");
      return;
    }

    sessionStorage.setItem("boxawfis-last-ticket", JSON.stringify(response.data));
    toast.success("Pass confirmed");
    router.push(
      `/event/${event.eventId}/pass?tenantId=${event.tenantId}&email=${encodeURIComponent(
        response.data.email
      )}&ticketCode=${response.data.ticketCode}`
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form
        onSubmit={handleBook}
        className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
          Attendee details
        </p>
        <h1 className="mt-2 text-3xl font-black">{ticket.ticketName}</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          {isFree ? "Free ticket" : money(ticket.ticketPrice)} for {event.eventName}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["fullName", "Full name", "text"],
            ["email", "Email", "email"],
            ["mobile", "Mobile", "tel"],
          ].map(([name, label, type]) => (
            <label key={name} className="flex flex-col gap-2 text-sm font-black text-slate-700">
              {label}
              <input
                name={name}
                type={type}
                value={form[name as keyof typeof form]}
                onChange={(eventValue) =>
                  setForm((current) => ({
                    ...current,
                    [name]: eventValue.target.value,
                  }))
                }
                required
                className="rounded-10 border border-slate-300 px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
              />
            </label>
          ))}

          {!isFree && (
            <label className="flex flex-col gap-2 text-sm font-black text-slate-700 sm:col-span-2">
              Payment proof URL
              <input
                value={form.paymentProofUrl}
                onChange={(eventValue) =>
                  setForm((current) => ({
                    ...current,
                    paymentProofUrl: eventValue.target.value,
                  }))
                }
                required
                placeholder="Paste screenshot or receipt link"
                className="rounded-10 border border-slate-300 px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
              />
            </label>
          )}
        </div>

        <button
          disabled={!canSubmit || loading || Boolean(booking)}
          className="mt-6 w-full rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-amber-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Working..." : isFree ? "Book and send OTP" : "Submit for review"}
        </button>
      </form>

      <aside className="rounded-14 border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
          Status
        </p>
        {!booking ? (
          <div className="mt-4 rounded-10 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Fill the form to create your booking. The backend will return a
            ticket code immediately.
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="rounded-10 bg-slate-950 p-4 text-white">
              <p className="text-xs font-black uppercase tracking-sm28 text-white/60">
                Ticket code
              </p>
              <p className="mt-1 text-2xl font-black">{booking.ticketCode}</p>
              <p className="mt-2 text-sm font-bold text-amber-200">
                {booking.bookingStatus.replaceAll("_", " ")}
              </p>
            </div>

            {booking.bookingStatus === "PENDING_OTP" && (
              <div>
                <label className="flex flex-col gap-2 text-sm font-black text-slate-700">
                  OTP
                  <input
                    value={otp}
                    onChange={(eventValue) => setOtp(eventValue.target.value)}
                    className="rounded-10 border border-slate-300 px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
                  />
                </label>
                <button
                  onClick={handleVerify}
                  disabled={!otp || loading}
                  className="mt-3 w-full rounded-10 bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:opacity-50">
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
