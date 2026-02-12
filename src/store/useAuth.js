import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userData: null,
      setAuth: (token, userData) => set({ token, userData }),
      clearAuth: () => set({ token: null, userData: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
