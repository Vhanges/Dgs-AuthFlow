import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: login,
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
        onSuccess: (response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          navigate("/profile");
        },
        onError: (err) => {
          setErrorMessage(err?.response?.data?.message || "Login failed");
          setTimeout(() => setErrorMessage(""), 3000);
        },
      });
    },
    [formData, mutation, navigate],
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
