import axiosInstance from "../axiosInstance";
import { handleResponse } from "./axios";

export const loginApi = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return handleResponse(response);
};
