import { Metadata } from "next";
import Image from "next/image";
// data/companyData.ts
interface Props {
  params: Promise<{ eventName: string }>;
  searchParams: Promise<{ collectionId?: string }>;
}

const companyData = [
  {
    name: "none",
    logo: "/images/logo.png",
    logoColor: "black",
    description: "No Company Found",
  },

  {
    name: "StarlineEvents",
    logo: "https://empedance.sgp1.digitaloceanspaces.com/testing/1755361456274_blob",
    logoColor: "#F97316",
    description:
      "We specialize in corporate events, weddings, and cultural programs.",
  },
  {
    name: "BlueMoonProductions",
    logo: "https://empedance.sgp1.digitaloceanspaces.com/testing/1755361512312_favicon.svg",
    logoColor: "#3B82F6",
    description:
      "Your partner for music festivals, concerts, and entertainment shows.",
  },
  {
    name: "Elite Gatherings",
    logo: "https://empedance.sgp1.digitaloceanspaces.com/testing/1755361572364_logoblack.svg",
    logoColor: "#10B981",
    description:
      "From intimate parties to grand galas, we create unforgettable experiences.",
  },
];
// 🔹 Dynamically set metadata (title, description, favicon)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramVal = await params;
  const eventName = paramVal?.eventName ?? "none";
  const company = companyData.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "") === eventName?.toLowerCase()
  );

  if (!company) {
    return {
      title: "Company Not Found",
      description: "The event company you are looking for does not exist.",
    };
  }

  return {
    title: company.name,
    description: company.description,
    icons: {
      icon: [{ url: company.logo, type: "image/png" }],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const paramsVal = await params;
  const eventName = paramsVal?.eventName;
  const company = companyData.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "") === eventName?.toLowerCase()
  );
  console.log(eventName);

  if (!company) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-bg text-fg">
        <h1 className="text-2xl font-bold">Company not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-bg text-fg px-6 py-10">
      {/* Card */}
      <div
        className="w-full max-w-lg rounded-2xl shadow-lg p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${company.logoColor} 0%, var(--accent) 100%)`,
        }}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={company.logo}
            alt={company.name}
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Company Name */}
        <h1 className="text-3xl font-bold mb-4">{company.name}</h1>

        {/* Description */}
        <p className="text-muted mb-6">{company.description}</p>

        {/* Booking Button */}
        <button
          className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition"
          style={{ backgroundColor: company.logoColor }}>
          Book Now
        </button>
      </div>
    </div>
  );
}
