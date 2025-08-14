"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSessionStorage } from "@/utils/manageStorage";

interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 5 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "zustand-counter",
      storage: createSessionStorage("zustand-counter"),
    }
  )
);
