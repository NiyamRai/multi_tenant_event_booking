import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    options: [
      { name: "Gold", price: 1000 },
      { name: "Platinum", price: 2000 },
      { name: "Diamond", price: 3000 },
    ],
  },
  {
    name: "StarlineEvents",
    logo: "https://empedance.sgp1.digitaloceanspaces.com/testing/1755361456274_blob",
    logoColor: "#F97316",
    description:
      "We specialize in corporate events, weddings, and cultural programs.",
    options: [
      { name: "Gold", price: 1000 },
      { name: "Platinum", price: 2000 },
      { name: "Diamond", price: 3000 },
    ],
  },
  {
    name: "BlueMoonProductions",
    logo: "https://empedance.sgp1.digitaloceanspaces.com/testing/1755361512312_favicon.svg",
    logoColor: "#3B82F6",
    description:
      "Your partner for music festivals, concerts, and entertainment shows.",
    options: [
      { name: "Gold", price: 1000 },
      { name: "Platinum", price: 2000 },
      { name: "Diamond", price: 3000 },
    ],
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
    title: "Register - " + company.name,
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
    <div className="w-full flex flex-col items-center justify-center  text-fg px-6 min-h-screen ">
      {/* Card */}
      <div
        className="w-full  rounded-2xl shadow-lg p-8 text-center"
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
      </div>
      <div className="mt-4  flex flex-wrap gap-4 w-full">
        {company?.options?.map((option, index) => (
          <Link
            href={`/event/${eventName}/register/${option.name}`}
            key={index}
            className="p-4 border-b px-5 rounded-10 bg-white border cursor-pointer transition-all ease-in-out hover:shadow-lg active:scale-95">
            <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
            <p className="text-muted">Price: ${option.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
