import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "./axiosConfig";

export const useUploadGalleryPhotos = () =>
  useMutation({
    mutationFn: async ({ photos }) => {
      const formData = new FormData();

      // Append all photos to FormData
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const response = await ApiService.versionedApi.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    },
  });

export const useGetAllGalleryPhotos = () =>
  useQuery({
    queryFn: async () => {
      const response = await ApiService.versionedApi.get("/upload");
      return response;
    },
    queryKey: [`get-all-photos`],
  });
