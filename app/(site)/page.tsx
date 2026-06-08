import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[linear-gradient(115deg,#101828_0%,#183b56_46%,#f59e0b_100%)] px-6 pt-24 text-white">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_20%,#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Image
                src="/boxAwfisLogoTp.png"
                alt="Box-Awfis"
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
              Live events. Clean bookings. Real passes.
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Box-Awfis
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              Find nearby events, pick your ticket, verify your booking, and
              carry a QR-ready pass in minutes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/events_near_by"
                className="rounded-10 bg-amber-400 px-6 py-3 font-black text-slate-950 shadow-xl shadow-black/20 transition hover:bg-amber-300">
                Explore events
              </Link>
              <Link
                href="/event/1/pass"
                className="rounded-10 border border-white/30 bg-white/10 px-6 py-3 font-black text-white backdrop-blur transition hover:bg-white/20">
                View pass
              </Link>
            </div>
          </div>

          <div className="relative rounded-14 border border-white/20 bg-white/12 p-5 shadow-2xl backdrop-blur">
            <div className="overflow-hidden rounded-10 bg-slate-950">
              <div className="aspect-[4/3] bg-[linear-gradient(145deg,#f8fafc_0%,#fde68a_42%,#ef4444_100%)] p-5">
                <div className="flex h-full flex-col justify-between rounded-10 border border-slate-950/15 bg-white/88 p-5 text-slate-950 shadow-xl">
                  <div>
                    <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
                      Featured tonight
                    </p>
                    <h2 className="mt-3 text-3xl font-black">
                      Music, tech, food, business
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                      A box office experience built around fast discovery,
                      clear prices, and reliable ticket status.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {["Search", "Book", "Scan"].map((item) => (
                      <div
                        key={item}
                        className="rounded-10 border border-slate-200 bg-white px-3 py-4 text-sm font-black shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-12 md:grid-cols-3">
        {[
          ["Curated nearby", "Filter by city and locality without losing context."],
          ["Ticket clarity", "See free, paid, and available ticket counts before booking."],
          ["Pass ready", "Confirmed bookings become QR-coded downloadable passes."],
        ].map(([title, body]) => (
          <div
            key={title}
            className="rounded-10 border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
