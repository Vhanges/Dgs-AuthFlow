import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";
import { useAuthStore } from "../store/useAuth";

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

  const handleChange = useCallback((values) => {
    const { name, value } = values.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (values) => {
      values.preventDefault();

      mutation.mutate(formData, {
        onSuccess: (data) => {
          login(
            data.data.accessToken,
            data.data.refreshToken,
            data.data.user || data.userData || {},
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
import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";
import { useAuthStore } from "../store/useAuth";

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

  const handleChange = useCallback((values) => {
    const { name, value } = values.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (values) => {
      values.preventDefault();

      mutation.mutate(formData, {
        onSuccess: (data) => {
          login(
            data.data.accessToken,
            data.data.refreshToken,
            data.data.user || data.userData || {},
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
import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";
import { useAuthStore } from "../store/useAuth";

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

  const handleChange = useCallback((values) => {
    const { name, value } = values.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (values) => {
      values.preventDefault();

      mutation.mutate(formData, {
        onSuccess: (data) => {
          login(
            data.data.accessToken,
            data.data.refreshToken,
            data.data.user || data.userData || {},
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
