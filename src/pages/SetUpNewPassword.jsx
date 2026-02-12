import Header from "../components/Header";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/auth";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

const SetUpNewPassword = () => {
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification } = App.useApp();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const token = searchParams.get("token");
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setIsModalOpen(true);
    },
  });

  const handleSubmit = async (e) => {
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
        description: "Password do not match.",
        placement: "topRight",
      });
      return;
    }

    if (formData.password.length < 8) {
      notification.warning({
        message: "Password Too Short",
        description: "Password is too short.",
        placement: "topRight",
      });
      return;
    }

    resetPasswordMutation.mutate({
      token: token,
      newPassword: formData.password,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full px-36.5 pt-8"
    >
      <Header
        title="Set up a New Password"
        subtitle="Create a unique passphrase for every account to prevent a single breach from compromising all your data."
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full gap-3">
          <div className="relative">
            <MdLockOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[18px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={resetPasswordMutation.isPending}
            />
          </div>
          <div className="relative">
            <MdLockOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[18px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={resetPasswordMutation.isPending}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-full px-25">
            <button
              type="submit"
              className={`cursor-pointer w-full p-2 bg-secondary rounded-md text-white font-bold text-md`}
            >
              {resetPasswordMutation.isPending ? "Resetting..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        title="Password Reset Successfully"
        open={isModalOpen}
        footer={null}
        closable={false}
        className="w-90! top-50!"
        styles={{
          header: {
            fontSize: "20px",
            fontWeight: "bold",
          },
        }}
      >
        <div className="flex flex-col gap-4">
          <p>You can now login with your new password.</p>
          <Link className="w-full flex justify-center items-center" to="/login">
            <button className="cursor-pointer w-full text-md rounded-md bg-secondary text-white font-bold p-2">
              Okay
            </button>
          </Link>
        </div>
      </Modal>
    </form>
  );
};

export default SetUpNewPassword;
