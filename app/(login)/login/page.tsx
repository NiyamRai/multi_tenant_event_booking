"use client";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const auth = useAuthStore((state) => state);
  const router = useRouter();
  const handleLogin = () => {};
  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/admin");
    }
  }, [auth.isAuthenticated]);

  return (
    <div className=" w-full h-screen bg-black flex flex-col gap-4 items-center justify-center">
      <input type="text" className="bg-white" />
      <input
        type="text"
        name=""
        id=""
        placeholder="password"
        className="bg-white"
      />
      <button className="p-4 bg-blue-500 text-white" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
