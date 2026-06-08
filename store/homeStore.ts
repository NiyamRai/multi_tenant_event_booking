"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSessionStorage } from "@/utils/manageStorage";
import { fetchHomeData } from "@/utils/api/homeApi";
import { HomeApiResponseData } from "@/utils/types/home";
import { getApiErrorMessage } from "@/utils/api/apiClient";

interface HomeState {
  homeData: HomeApiResponseData | null;
  loading: boolean;
  error: string | null;
  fetchHome: () => Promise<void>;
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      homeData: null,
      loading: false,
      error: null,

      fetchHome: async () => {
        set({ loading: true, error: null });

        const res = await fetchHomeData();

        if (res.status === 1) {
          set({ homeData: res.data, loading: false });
        } else {
          set({ error: getApiErrorMessage(res.error, "Failed to fetch"), loading: false });
        }
      },
    }),
    {
      name: "zustand-home",
      storage: createSessionStorage("zustand-home"),
      partialize: (state) => ({
        homeData: state.homeData, // persist only this if desired
      }),
    }
  )
);
