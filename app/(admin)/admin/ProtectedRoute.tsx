"use client";

import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useAuthStore((state) => state);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!auth?.isAuthenticated) {
      router.push("/login");
    }
  }, [isMounted, auth?.isAuthenticated, router]);

  if (!isMounted || !auth?.isAuthenticated) {
    return null; // or loading spinner
  }

  return <>{children}</>;
}
