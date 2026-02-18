import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const api = import.meta.env.VITE_API_BASE_URL;

export const useLoginApi = () =>
  useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const { data } = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message);
      }
    },
  });

export const googleLogin = () => {
  window.location.href = `${api}/auth/google`;
};

export const useSignUpApi = () =>
  useMutation({
    mutationFn: async (userData) => {
      try {
        const { data } = await axiosInstance.post("/auth/signup", userData);
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message);
      }
    },
  });

export const useForgotPasswordApi = () =>
  useMutation({
    mutationFn: async ({ email }) => {
      try {
        const { data } = await axiosInstance.post("/auth/forgot-password", {
          email,
        });
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message);
      }
    },
  });

export const useResetPasswordApi = () =>
  useMutation({
    mutationFn: async ({ token, newPassword }) => {
      try {
        const { data } = await axiosInstance.post("/auth/reset-password", {
          token,
          newPassword,
        });
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message);
      }
    },
  });
