import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userData: null,
      
      // Login action - only store user data, cookie handles auth
      login: (userData) => 
        set({ userData }),
      
      // Logout action  
      logout: () => 
        set({ userData: null }),
      
      // Check if user is authenticated
      isAuthenticated: () => {
        const { userData } = get();
        return !!userData;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userData: state.userData
      })
    }
  )
);
