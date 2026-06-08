import { BoxOfficeEvent, Ticket } from "@/utils/types/boxOffice";

export const fallbackEvents: BoxOfficeEvent[] = [
  {
    eventId: 1,
    tenantId: "demo-tenant",
    eventName: "Starline Live Fest",
    eventBanner: null,
    cityName: "Mumbai",
    locality: "Bandra",
    venue: "Awfis Auditorium",
    eventDateTime: "2026-08-20T19:30:00",
    eventCategory: "Music",
    paidEvent: true,
    description:
      "A high-energy live event with curated performers, smooth check-in, and beautiful digital passes.",
    eventTags: ["Live", "Music", "Featured"],
  },
  {
    eventId: 2,
    tenantId: "demo-tenant",
    eventName: "Founder Mixer",
    eventBanner: null,
    cityName: "Bengaluru",
    locality: "Indiranagar",
    venue: "Box-Awfis Hall",
    eventDateTime: "2026-09-04T18:00:00",
    eventCategory: "Business",
    paidEvent: false,
    description:
      "Meet builders, investors, and operators in a focused evening designed for useful conversations.",
    eventTags: ["Startup", "Networking", "Free"],
  },
];

export const fallbackTickets: Ticket[] = [
  {
    ticketId: 101,
    tenantId: "demo-tenant",
    ticketPrefix: "STAR",
    ticketName: "Gold",
    ticketPrice: 1000,
    isTicketFree: false,
    ticketQuantity: 120,
    bookedQuantity: 35,
    availableQuantity: 85,
    isActive: true,
    eventId: 1,
  },
  {
    ticketId: 102,
    tenantId: "demo-tenant",
    ticketPrefix: "STAR",
    ticketName: "Platinum",
    ticketPrice: 2000,
    isTicketFree: false,
    ticketQuantity: 80,
    bookedQuantity: 41,
    availableQuantity: 39,
    isActive: true,
    eventId: 1,
  },
  {
    ticketId: 201,
    tenantId: "demo-tenant",
    ticketPrefix: "MIX",
    ticketName: "Community Pass",
    ticketPrice: 0,
    isTicketFree: true,
    ticketQuantity: 150,
    bookedQuantity: 22,
    availableQuantity: 128,
    isActive: true,
    eventId: 2,
  },
];

export const findFallbackEvent = (eventNameOrId: string) => {
  const decoded = decodeURIComponent(eventNameOrId);
  const numericId = Number(decoded);
  if (!Number.isNaN(numericId)) {
    return fallbackEvents.find((event) => event.eventId === numericId) ?? null;
  }

  const normalized = decoded.toLowerCase().replace(/\s+/g, "");
  return (
    fallbackEvents.find(
      (event) =>
        event.eventName.toLowerCase().replace(/\s+/g, "") === normalized
    ) ?? null
  );
};

export const getFallbackTicketsForEvent = (eventId: number) =>
  fallbackTickets.filter((ticket) => ticket.eventId === eventId);
