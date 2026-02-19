import { useSearchParams } from "react-router-dom";
import { Form, Button, Input } from "antd";
import Header from "../components/Header";
import { useState } from "react";
import { App } from "antd";
import { useResetPasswordApi } from "../services/useAuth";
import PasswordResetModal from "../components/modals/PasswordResetModal";

const SetUpNewPassword = () => {
  const resetPasswordApi = useResetPasswordApi();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification } = App.useApp();

  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const token = searchParams.get("token");
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (values) => {
    if (!token) {
      notification.warning({
        message: "Invalid Reset Link",
        description:
          "This reset link is invalid. Please request a new password reset.",
        placement: "topRight",
      });
      return;
    }

    resetPasswordApi.mutate(
      { token, newPassword: values.password },
      {
        onSuccess: () => setIsModalOpen(true),
        onError: () => {},
      },
    );
  };

  return (
    <>
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        disabled={resetPasswordApi.isPending}
        layout="vertical"
      >
        <Header
          title="Set up a New Password"
          subtitle="Create a unique passphrase for every account to prevent a single breach from compromising all your data."
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full gap-3">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <div className="relative w-full">
                <label
                  className={`absolute left-3 transition-all text-gray-400 duration-200 pointer-events-none z-10 ${
                    newPasswordFocused || newPasswordValue
                      ? "-top-2.5 text-xs bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  New Password
                </label>
                <Input.Password
                  onFocus={() => setNewPasswordFocused(true)}
                  onBlur={() => setNewPasswordFocused(false)}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  className="border! border-black! focus:outline-none! outline-none! bg-white!"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <div className="relative w-full">
                <label
                  className={`absolute left-3 transition-all text-gray-400 duration-200 pointer-events-none z-10 ${
                    confirmPasswordFocused || confirmPasswordValue
                      ? "-top-2.5 text-xs bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  Confirm Password
                </label>
                <Input.Password
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  className="border! border-black! focus:outline-none! outline-none! bg-white!"
                />
              </div>
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            type="primary"
            block
            htmlType="submit"
            size="large"
            loading={resetPasswordApi.isPending}
          >
            {resetPasswordApi.isPending ? "Resetting..." : "Confirm"}
          </Button>
        </div>
      </Form>

      <PasswordResetModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default SetUpNewPassword;
