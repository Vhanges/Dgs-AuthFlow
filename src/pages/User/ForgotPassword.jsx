import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Form, Input, Button } from "antd";
import ForgotPasswordModal from "../../components/modals/ForgotPasswordModal";
import Heading from "../../components/Heading";
import { useForgotPasswordApi } from "../../services/useAuth";

const ForgotPassword = () => {
  const forgotPasswordApi = useForgotPasswordApi();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    forgotPasswordApi.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
      onError: () => {},
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto px-8">
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-6"
        layout="vertical"
        disabled={forgotPasswordApi.isPending}
      >
        <Heading
          title="Forgot Password"
          subtitle="The instructions will be sent to the email you provide."
        />

        <div className="flex flex-col gap-3">
          <Form.Item className="flex! flex-col! gap-4!">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                { type: "email" },
              ]}
            >
              <div className="relative w-full">
                <label
                  className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                    emailFocused || emailValue
                      ? "-top-2.5 text-xs  bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  Email
                </label>
                <Input
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="border! border-black! focus:outline-none! outline-none! bg-white! "
                />
              </div>
            </Form.Item>
          </Form.Item>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            type="primary"
            size="large"
            loading={forgotPasswordApi.isPending}
            htmlType="submit"
            block
            className="max-w-full"
          >
            {forgotPasswordApi.isPending
              ? "Sending Email..."
              : "Send Reset Link"}
          </Button>

          <Link
            to="/login"
            disabled={forgotPasswordApi.isPending}
            className="flex justify-center items-center gap-1 text-sm text-black hover:underline mt-2"
          >
            <GoArrowLeft />
            <span>Back to Login</span>
          </Link>
        </div>
      </Form>

      <ForgotPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ForgotPassword;
