import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;
const noVerAPI = import.meta.env.VITE_API_BASE_URL_NO_VERSION;


export const useUploadGalleryPhotos = () => 
    useMutation({
        mutationFn: async ({ token, photos }) => {
            const formData = new FormData();
            
            // Append all photos to FormData
            photos.forEach((photo, index) => {
                formData.append('photos', photo);
            });

            const response = await axios.post(`${api}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                 }
            });

            return response.data;
        }
    });

export const useGetAllGalleryPhotos = () => 
    useMutation({
        mutationFn: async (token) => {
            const response = axios.get(`${noVerAPI}/upload`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            return response;
        }
    });

// Default export for non-hook usage
const galleryService = {
    getGallery: async (token) => {
        const response = await axios.get(`${api}/upload`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export default galleryService;
