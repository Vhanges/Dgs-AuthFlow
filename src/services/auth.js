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
        credentials: "include", // Cookie will be set by backend
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message, "Signup failed");
      }

      return data; 
    },
  });
  
  export const useForgotPasswordApi = async (email) => {
  const res = await fetch(`${api}/auth/forgot-password`, {
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
    const res = await fetch(`${api}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token, newPassword }),
    });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message, "Failed to reset password");
  }

  return res.json();
};

export const logoutApi = async () => {
  const res = await fetch(`${api}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message, "Failed to logout");
  }

  return res.json();
};
    export const googleLogin = () => {
      window.location.href = `${api}/auth/google`;
    };
    
    export const signUp = {
      signup: async (userData) => {
        const response = await fetch(`${api}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.message, "Signup failed");
        }
    
        return data;
      },
    };
