"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createLocalStorage } from "@/utils/manageStorage";
import { User } from "@/utils/types/user";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "zustand-auth",
      storage: createLocalStorage("zustand-auth"),
    }
  )
);
