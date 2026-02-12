import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userData: null,
      
      // Login action
      login: (accessToken, refreshToken, userData = null) => 
        set({ accessToken, refreshToken, userData }),
      
      // Logout action  
      logout: () => 
        set({ accessToken: null, refreshToken: null, userData: null }),
      
      // Check if user is authenticated
      isAuthenticated: () => {
        const { accessToken, userData } = get();
        return !!(accessToken && userData);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userData: state.userData
      })
    }
  )
);
