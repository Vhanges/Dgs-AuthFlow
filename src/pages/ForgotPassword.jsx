import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Modal, Form, Input, Button } from "antd";
import { Button, Input, Modal, Form } from "antd";
import Header from "../components/Header";
import AntButton from "../components/Button";
import { useForgotPasswordApi } from "../services/useAuth";
import { useState } from "react";

const ForgotPassword = () => {
  const forgotPasswordApi = useForgotPasswordApi();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <Form
        onFinish={handleSubmit}
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        layout="vertical"
        disabled={forgotPasswordApi.isPending}
      >
        <Header
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
              <Input
                prefix={<MdOutlineMailOutline style={{ color: "#797979" }} />}
                placeholder="Email"
                className="mb-2.5!"
              />
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
            className="flex justify-center items-center gap-1 text-sm text-black hover:underline mt-2"
          >
            <GoArrowLeft />
            <span>Back to Login</span>
          </Link>
        </div>
      </Form>

      <Modal
        title="Password Reset Email Sent"
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
          <p>A reset link has been sent to your email.</p>
          <Link
            className="w-full flex justify-center items-center"
            to="/login"
            onClick={closeModal}
          >
            <AntButton variant="primary">Okay</AntButton>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
