"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createLocalStorage } from "@/utils/manageStorage";
import { Match } from "@/utils/types/match";

interface MatchStatsState {
  matches: Match[];
  addMatch: (match: Match) => void;
  deleteMatch: (id: number) => void;
  updateMatch: (match: Match) => void;
  updateMatches: (matches: Match[]) => void;
}

export const useMatchStatsStore = create<MatchStatsState>()(
  persist(
    (set) => ({
      matches: [],
      addMatch: (match) =>
        set((state) => ({ matches: [...state.matches, match] })),
      deleteMatch: (id) =>
        set((state) => ({ matches: state.matches.filter((m) => m.id !== id) })),
      updateMatch: (match) =>
        set((state) => ({
          matches: state.matches.map((m) => (m.id === match.id ? match : m)),
        })),
      updateMatches: (matches) => set({ matches }),
    }),
    {
      name: "zustand-match-stats",
      storage: createLocalStorage("zustand-match-stats"),
    }
  )
);
