import { Link, useSearchParams } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { Modal, Form, Button, Input } from "antd";
import Header from "../components/Header";
import { useState } from "react";
import { App } from "antd";
import { useResetPasswordApi } from "../services/useAuth";

const SetUpNewPassword = () => {
  const resetPasswordApi = useResetPasswordApi();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification } = App.useApp();

  const token = searchParams.get("token");
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      {
        token,
        newPassword: values.password,
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
        },
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
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input.Password
                prefix={<MdLockOutline />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input.Password
                prefix={<MdLockOutline />}
                placeholder="Confirm Password"
              />
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
            variant="primary"
          >
            {resetPasswordApi.isPending ? "Resetting..." : "Confirm"}
          </Button>
        </div>
      </Form>

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
          <Link
            className="w-full flex justify-center items-center"
            to="/login"
            onClick={closeModal}
          >
            <Button type="primary" size="large">
              Okay
            </Button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default SetUpNewPassword;
