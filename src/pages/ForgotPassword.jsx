import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Modal, Form, Input, Button } from "antd";
import Header from "../components/Header";
import AntButton from "../components/Button";
import { useForgotPasswordApi } from "../services/auth";

const ForgotPassword = () => {
  const forgotPasswordRequestApi = useForgotPasswordApi();
  const { mutate, isPending } = forgotPasswordRequestApi;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        console.log("Success");
        setIsModalOpen(true);
      },
      onError: () => {
        console.log("Failed");
      },
    });
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        noValidate
      >
        <Header
          title="Forgot Password"
          subtitle="The instructions will be sent to the email you provide."
        />

        <div className="flex flex-col gap-3">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={
                <MdOutlineMailOutline
                  color="#797979"
                  className="text-[#797979]"
                  style={{ color: "#797979" }}
                />
              }
              placeholder="Email"
              disabled={isPending}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            htmlType="submit"
            type="primary"
            disabled={isPending}
            size="large"
            block
            className="max-w-full"
          >
            {isPending ? "Sending Email..." : "Send Reset Link"}
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
