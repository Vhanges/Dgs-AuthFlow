import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { App } from "antd";
import { resetPassword } from "../services/auth";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { notification } = App.useApp();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onError: (error) => {
      notification.error({
        message: "Reset Failed",
        description:
          error.message || "Failed to reset password. Please try again.",
        placement: "topRight",
      });
    },
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

      if (!token) {
        notification.warning({
          message: "Invalid Reset Link",
          description:
            "This reset link is invalid. Please request a new password reset.",
          placement: "topRight",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        notification.warning({
          message: "Password Mismatch",
          description: "Passwords do not match.",
          placement: "topRight",
        });
        return;
      }

      if (formData.password.length < 8) {
        notification.warning({
          message: "Password Too Short",
          description: "Password must be at least 8 characters.",
          placement: "topRight",
        });
        return;
      }

      mutation.mutate({
        token: token,
        newPassword: formData.password,
      });
    },
    [formData, token, mutation, notification],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    formData,
    isModalOpen,
    isPending: mutation.isPending,
    handleChange,
    handleSubmit,
    closeModal,
  };
};
