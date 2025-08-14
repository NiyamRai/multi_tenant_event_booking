"use client";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const auth = useAuthStore((state) => state);
  const router = useRouter();
  const handleLogin = () => {
    const resp = {
      accessToken:
        "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmdAc3RyaW5nLmNvbSIsImlhdCI6MTc0NTgyMzU5NCwiZXhwIjoxNzQ2NDI4Mzk0fQ.O9Sb_qdo6W-iopn_Vie0_DhVd8u8UX1l0H7zUTfhuDcCoMuL_AJTODma0I24VBAZ",
      tokenType: "Bearer",
      role: "ROLE_ADMIN",
      userId: "3",
      permissions: ["can_fetch_gallery", "can_create_gallery"],
    };
    auth.login(resp);
  };
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
