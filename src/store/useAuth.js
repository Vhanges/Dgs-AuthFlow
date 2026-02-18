import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userData: {
        account_id: 0,
        google_id: 0,
        gallery_id: 0,
        email: "",
        display_name: "",
        age: 0,
        avatar_url: "",
        is_active: 0,
      },

      // Set user data action for update :>
      setUserData: (newData) =>
        set((state) => ({
          userData: {
            ...state.userData, // Keep existing fields
            ...newData, // Overwrite only the fields provided
          },
        })),

      // Logout action
      logout: () => set({ userData: null }),

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
