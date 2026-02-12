import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";
import { useAuthStore } from "../store/authStore"; // Adjust the import path to your store

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: loginService,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      mutation.mutate(formData, {
        onSuccess: (data) => {
          // Use Zustand store instead of localStorage
          login(
            data.accessToken,
            data.refreshToken,
            data.user || data.userData || {}, // handle different API response formats
          );
          navigate("/home");
        },
        onError: (error) => {
          setErrorMessage(error.message || "Login failed");
          setTimeout(() => setErrorMessage(""), 3000);
        },
      });
    },
    [formData, mutation, navigate, login],
  );

  const clearError = useCallback(() => {
    setErrorMessage("");
  }, []);

  return {
    formData,
    errorMessage,
    isPending: mutation.isPending,
    error: mutation.error,
    handleChange,
    handleSubmit,
    clearError,
  };
};
