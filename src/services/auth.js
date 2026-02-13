import { useMutation } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API_BASE_URL;

export const useLoginApi = () =>
  useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      export const useLoginApi = () =>
        useMutation({
          mutationFn: async ({ email, password }) => {
            const response = await fetch(`${api}/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || "Login failed");
            }

            return response.json();
          },
        });
      return response.json();
    },
  });

export const googleLogin = () => {
  window.location.href = `/auth/google`;
};

export const signUp = {
  signup: async (userData) => {
    const response = await fetch(`/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message, "Signup failed");
    }

    return data;
  },
};

export const forgotPasswordRequest = async (email) => {
  const res = await fetch(`/api/v1/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message, "Forgot password failed");
  }

  return data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const res = await fetch(`/api/v1/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message, "Failed to reset password");
  }

  return res.json();
};
