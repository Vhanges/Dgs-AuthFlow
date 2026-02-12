import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { signUp } from "../services/auth"; // Adjust import based on your service

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: signUp.signup,
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

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Password did not match.");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      mutation.mutate(formData, {
        onSuccess: () => {
          setIsModalOpen(true);
        },
        onError: (error) => {
          setErrorMessage(
            error?.response?.data?.message ||
              error.message ||
              "An error occurred during signup",
          );
          setTimeout(() => setErrorMessage(""), 3000);
        },
      });
    },
    [formData, mutation],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    formData,
    errorMessage,
    isModalOpen,
    isPending: mutation.isPending,
    handleChange,
    handleSubmit,
    closeModal,
  };
};
