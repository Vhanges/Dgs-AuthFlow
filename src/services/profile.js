import axiosInstance from "./axiosInstance";

const profile = {
  getProfile: async () => {
    try {
      const { data } = await axiosInstance.get("/user/profile");
      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },

  updateProfile: async (profileData) => {
    try {
      const { data } = await axiosInstance.put("/user/profile", profileData);
      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },

  // If you need to upload files (like profile picture)
  uploadProfileImage: async (formData) => {
    try {
      const { data } = await axiosInstance.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to upload image",
      );
    }
  },
};

export default profile;
