import { Button, Form, Input, App } from "antd";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AntButton from "../../components/Button";
import Divider from "../../components/Divider";
import Heading from "../../components/Heading";
import { useAuthStore } from "../../store/useAuth";
import { googleLogin, useLoginApi } from "../../services/useAuth";
import { useState } from "react";

const Login = () => {
  const loginApi = useLoginApi();
  const { setUserData } = useAuthStore();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = (values) => {
    loginApi.mutate(values, {
      onSuccess: ({ data: userData }) => {
        setUserData(userData);
        navigate("/home");
      },
      onError: () => {
        notification.warning({
          message: "Wrong credentials",
          description: "The email and password is incorrect.",
          placement: "topRight",
        });
      },
    });
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto px-8">
      <Heading title="Login" subtitle="Enter email and password" />

      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          email: "ligey34693@fentaoba.com",
          password: "password1234",
        }}
        disabled={loginApi.isPending}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email" },
            ]}
            className="mb-3!"
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
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-1!"
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
                className="border! border-black! focus:outline-none! outline-none! bg-white! "
              />
            </div>
          </Form.Item>

          <div className="flex justify-end">
            <Link
              className="italic font-medium text-xs hover:underline"
              to="/forgot-password"
              disabled={loginApi.isPending}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Button
            size="large"
            loading={loginApi.isPending}
            htmlType="submit"
            type="primary"
            block
          >
            {loginApi.isPending ? "Logging In" : "Login"}
          </Button>

          <Divider />

          <Button
            onClick={handleGoogleLogin}
            disabled={loginApi.isPending}
            variant="secondary"
            block
            size="large"
            className="border! border-gray-600! hover:border-primary!"
          >
            <FaGoogle />
            <span className="text-sm font-medium">Sign in with Google</span>
          </Button>
        </div>
      </Form>

      <div className="flex gap-2 justify-center items-center mt-6">
        <p className="text-sm">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-sm underline hover:no-underline"
          disabled={loginApi.isPending}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
