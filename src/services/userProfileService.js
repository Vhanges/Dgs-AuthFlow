import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "./axiosConfig";

export const useGetProfile = () =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await ApiService.versionedApi.get(`/user/profile`);
      console.log("name:", response);
      return response;
    },
    retry: false,
  });

export const useEditUserProfile = () =>
  useMutation({
    mutationFn: async ({ display_name, age }) => {
      const response = await ApiService.versionedApi.patch("/user/profile", {
        display_name,
        age,
      });
      return response;
    },
  });

// Api Request for updating/uploading user profile photo
export const useUpdateUserPhoto = () =>
  useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await ApiService.versionedApi.post(
        "/user/profile/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response;
    },
  });

// Api Request for deactivating user account
export const useDeactivateAccount = () =>
  useMutation({
    mutationFn: async () => {
      const response = await ApiService.versionedApi.patch("/user/deactivate");
      return response.data;
    },
  });


  // Api Request for deactivating user account
export const useDeleteAccount = () =>
  useMutation({
    mutationFn: async () => {
      const response = await ApiService.versionedApi.delete("/user");
      return response.data;
    },
  });