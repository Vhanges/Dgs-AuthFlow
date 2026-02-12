import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { forgotPasswordRequest } from "../services/auth";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: () => {
      setIsModalOpen(true);
      setEmail("");
    },
    onError: (error) => {
      setErrorMessage(error.message || "Failed to send reset email");
      setTimeout(() => setErrorMessage(""), 3000);
    },
  });

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email) {
        setErrorMessage("Please enter your email address");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      mutation.mutate(email);
    },
    [email, mutation],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    email,
    errorMessage,
    isModalOpen,
    isPending: mutation.isPending,
    handleEmailChange,
    handleSubmit,
    closeModal,
  };
};
