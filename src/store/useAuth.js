import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userData: null,

      // Login action
      login: (userData = null) => set({ userData }),

      // Logout action
      logout: () =>
        set({ accessToken: null, refreshToken: null, userData: null }),

      // Check if user is authenticated
      isAuthenticated: () => {
        const { userData } = get();
        return !!userData;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userData: state.userData,
      }),
    },
  ),
);
