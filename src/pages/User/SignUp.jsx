import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { GoArrowLeft } from "react-icons/go";
import { Button, Modal, Form, Input } from "antd";
import Heading from "../../components/Heading";
import { useSignUpApi } from "../../services/useAuth";
import { useState } from "react";
import SignUpModal from "../../components/modals/SignUpModal";

const SignUp = () => {
  const signUpApi = useSignUpApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

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
      <Heading
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
          <div className="flex flex-col gap-3">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
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
                  className="border! border-black! focus:outline-none! outline-none! bg-white!"
                />
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <div className="relative w-full">
                <label
                  className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                    passwordFocused || passwordValue
                      ? "-top-2.5 text-xs  bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  Password
                </label>
                <Input.Password
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onChange={(e) => setPasswordValue(e.target.value)}
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
                  className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                    confirmPasswordFocused || confirmPasswordValue
                      ? "-top-2.5 text-xs  bg-white px-1"
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
            disabled={signUpApi.isPending}
            className="flex justify-center items-center gap-1 text-sm text-black hover:underline mt-2"
          >
            <GoArrowLeft />
            <span>Back to Login</span>
          </Link>
        </div>
      </Form>

      <SignUpModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SignUp;
