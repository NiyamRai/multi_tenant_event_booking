import React from "react";

interface props {
  params: { blogName: string };
  className?: string;
}

export default async function page({ params }: props) {
  const { blogName } = await params;
  return <div className="min-h-screen">{blogName}</div>;
}
