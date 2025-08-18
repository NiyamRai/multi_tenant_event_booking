"use client";
import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import Image from "next/image";

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

export default function PassPage() {
  const user = { name: "Niyam", mobile: "7272900000" };
  const company = companyData[1]; // Example: StarlineEvents

  const downloadPDF = async () => {
    const doc = new jsPDF();

    // Header bar with theme color
    doc.setFillColor(company.logoColor);
    doc.rect(0, 0, 210, 40, "F");

    // Company name in header
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(company.name, 15, 25);

    // User info
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`User: ${user.name}`, 15, 60);
    doc.text(`Mobile: ${user.mobile}`, 15, 70);

    // Company description
    doc.text(`Description: ${company.description}`, 15, 90, { maxWidth: 180 });

    // --- Generate QR code from mobile number ---
    const qrData = await QRCode.toDataURL(user.mobile);
    doc.addImage(qrData, "PNG", 150, 60, 40, 40);

    // Save PDF
    doc.save(`${company.name}_Pass.pdf`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#f8f9fa" }}>
      <div
        className="w-full max-w-md rounded-2xl shadow-lg p-6 text-center"
        style={{ border: `4px solid ${company.logoColor}` }}>
        <div className="flex justify-center">
          <Image
            src={company.logo}
            alt={company.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <h1
          className="text-2xl font-bold mt-4"
          style={{ color: company.logoColor }}>
          {company.name}
        </h1>
        <p className="mt-2 text-gray-700">{company.description}</p>

        <div className="mt-6 space-y-2">
          <p className="font-semibold">User Details</p>
          <p>Name: {user.name}</p>
          <p>Mobile: {user.mobile}</p>
        </div>

        <button
          onClick={downloadPDF}
          className="mt-6 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition hover:scale-105"
          style={{ backgroundColor: company.logoColor }}>
          Download Pass (PDF with QR)
        </button>
      </div>
    </div>
  );
}
