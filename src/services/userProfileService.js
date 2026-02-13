import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;
const noVerAPI = import.meta.env.VITE_API_BASE_URL_NO_VERSION;

// Hook for fetching user profile
export const useGetProfile = () =>
  useMutation({
    mutationFn: async (token) => {
      const response = await axios.get(`${api}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    },
  });

// Hook for editing user profile
export const useEditUserProfile = () =>
  useMutation({
    mutationFn: async ({ token, display_name, age }) => {
      const response = await axios.patch(
        `${api}/user/profile`,
        { display_name, age },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  });

 // Hook for deactivating user account
 // TODO: This doesn't work
export const useDeactivateAccount = () =>
  useMutation({
    mutationFn: async (token) => {
      const response = await axios.patch(
        `${noVerAPI}/user/deactivate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  }); 

// Default export for non-hook usage
const profileService = {
  getProfile: async (token) => {
    const response = await axios.get(`${api}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  },

  editUserProfile: async (token, { display_name, age }) => {
    const response = await axios.patch(
      `${api}/user/profile`,
      { display_name, age },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
  useDeactivateAccount: async (token) => {
    const response = await axios.patch(
      `${api}/user/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
};

export default profileService;
