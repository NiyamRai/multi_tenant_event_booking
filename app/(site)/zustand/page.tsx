"use client";

import { useAuthStore, useCounterStore } from "@/store";
import { useHomeStore } from "@/store/homeStore";
import { fetchHomeData } from "@/utils/api/homeApi";
import React from "react";

export default function Page() {
  const count = useCounterStore((state) => state.count);
  const counter = useCounterStore();
  const auth = useAuthStore((state) => state);
  const authAction = useAuthStore();
  const home = useHomeStore((state) => state);

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center text-3xl">
      {count}
      <button
        className="rounded-10 bg-neutral-700 text-white"
        onClick={() => counter.increase()}>
        Increase
      </button>

      <div className="bg-neutral-400 p-5 flex-col items-center justify-center">
        {auth.isAuthenticated + (auth?.user?.role || "")}
        <button
          className="p-4 bg-blue-500 text-white"
          onClick={() =>
            authAction.login({
              id: 3,
              name: "string",
              email: "string",
              accessToken:
                "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmdAc3RyaW5nLmNvbSIsImlhdCI6MTc0NTgyMzU5NCwiZXhwIjoxNzQ2NDI4Mzk0fQ.O9Sb_qdo6W-iopn_Vie0_DhVd8u8UX1l0H7zUTfhuDcCoMuL_AJTODma0I24VBAZ",
              tokenType: "Bearer",
              role: "ROLE_ADMIN",
              userId: "3",
              permissions: ["can_fetch_gallery", "can_create_gallery"],
            })
          }>
          Login
        </button>
        <button
          className="p-4 bg-blue-500 text-white ml-2"
          onClick={() => authAction.logout()}>
          Log Out
        </button>
      </div>

      {"home Data" + home.homeData?.banner.id}
      <button
        className="p-4 bg-blue-500 text-white ml-2"
        onClick={async () => {
          console.log(await home.fetchHome());
        }}>
        Home
      </button>
      <button
        className="p-4 bg-blue-500 text-white ml-2"
        onClick={async () => {
          console.log(await fetchHomeData());
        }}>
        Home
      </button>
    </div>
  );
}
