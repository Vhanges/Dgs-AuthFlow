import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { GoArrowLeft } from "react-icons/go";
import { Button, Modal, Form, Input } from "antd";
import Header from "../components/Header";
import { useSignUpApi } from "../services/useAuth";
import { useState } from "react";

const SignUp = () => {
  const signUpApi = useSignUpApi();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    signUpApi.mutate(values, {
      onSuccess: ({ data }) => {
        console.log("Success", data);
        setIsModalOpen(true);
      },
      onError: () => {},
    });
  };

  return (
    <div
      className="flex flex-col gap-6 w-full max-w-md mx-auto px-8"
      noValidate
    >
      <Header
        title="Sign Up"
        subtitle="Kindly fill up the needed information below"
      />
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        layout="vertical"
        disabled={signUpApi.isPending}
      >
        <div className="flex flex-col gap-3">
          <Form.Item className="flex! flex-col! gap-4!">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email" },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined
                    color="#797979"
                    className="text-[#797979]"
                    style={{ color: "#797979" }}
                  />
                }
                placeholder="Email"
                className="mb-2.5!"
              ></Input>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    color="#797979"
                    className="text-[#797979]"
                    style={{ color: "#797979" }}
                  />
                }
                placeholder="Password"
                className="mb-2.5!"
              ></Input.Password>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: "This field is requiredd" }]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    color="#797979"
                    className="text-[#797979]"
                    style={{ color: "#797979" }}
                  />
                }
                placeholder="Confirm Password"
                className="mb-2.5!"
              ></Input.Password>
            </Form.Item>
          </Form.Item>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={handleSubmit}
            type="primary"
            htmlType="submit"
            loading={signUpApi.isPending}
            size="large"
          >
            {useSignUpApi.isPending ? "Signing up..." : "Sign Up"}
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
        title="Account Successfully Created"
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
          <p>Check your email to verify your account.</p>
          <Link
            className="w-full flex justify-center items-center"
            to="/login"
            onClick={closeModal}
          >
            <button variant="primary">Okay</button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
