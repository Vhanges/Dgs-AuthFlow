import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "./axiosConfig";

// Hook for fetching user profile
export const useGetProfile = () =>
  useQuery({
    queryKey: ["userProfile"], // Unique key for caching
    queryFn: async () => {
      const response = await ApiService.versionedApi.get(`/user/profile`);
      return response;
    },
  });

// Hook for editing user profile
export const useEditUserProfile = () =>
  useMutation({
    mutationFn: async ({ display_name, age }) => {
      const response = await ApiService.versionedApi.patch(
        '/user/profile',
        { display_name, age }
      );
      return response;
    },
  });

// Hook for deactivating user account
export const useDeactivateAccount = () =>
  useMutation({
    mutationFn: async (token) => {
      // const response = await axios.patch(
      //   `${noVerAPI}/user/deactivate`,
      //   {},
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // return response.data;
      return {}; // Return empty value for testing
    },
  });

// Default export for non-hook usage
const profileService = {
  getProfile: async (token) => {
    // const response = await axios.get(`${api}/user/profile`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // return response.data.data;
    return {}; // Return empty value for testing
  },

  editUserProfile: async (token, { display_name, age }) => {
    // const response = await axios.patch(
    //   `${api}/user/profile`,
    //   { display_name, age },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    // return response.data;
    return {}; // Return empty value for testing
  },

  useDeactivateAccount: async (token) => {
    // const response = await axios.patch(
    //   `${api}/user/profile`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    // return response.data;
    return {}; // Return empty value for testing
  },
};

export default profileService;
