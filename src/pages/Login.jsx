import { Button, Form, Input, App } from "antd";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import AntButton from "../components/Button";
import Divider from "../components/Divider";
import Header from "../components/Header";

import { useAuthStore } from "../store/useAuth";
import { googleLogin, useLoginApi } from "../services/useAuth";
import { useGetProfile } from "../services/userProfileService";

const Login = () => {
  const loginApi = useLoginApi();
  const { setUserData } = useAuthStore();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  // const { data, isSuccess } = useGetProfile({
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });

  // setUserData(
  //   {
  //     account_id: 12412412,
  //     google_id: 15123123,
  //     gallery_id: 405124123,
  //     email: "kennethsanpedro1108@gmail.com",
  //     display_name: "Kennesu",
  //     age: 30,
  //     avatar_url: "",
  //     is_active: 0,
  //   },
  //   // avigate("/home"),
  // );

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
      <Header title="Login" subtitle="Enter email and password" />

      <Form
        onFinish={handleSubmit}
        layout="vertical"
        disabled={loginApi.isPending}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#797979" }} />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#797979" }} />}
              placeholder="Password"
            />
          </Form.Item>

          <div className="flex justify-end">
            <Link
              className="italic font-medium text-xs hover:underline"
              to="/forgot-password"
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

          <AntButton
            type="button"
            onClick={handleGoogleLogin}
            disabled={loginApi.isPending}
            variant="secondary"
            className="bg-gray-300 flex justify-center items-center rounded-md p-2 gap-2"
          >
            <FaGoogle />
            <span className="text-sm font-medium">Sign in with Google</span>
          </AntButton>
        </div>
      </Form>

      <div className="flex gap-2 justify-center items-center mt-6">
        <p className="text-sm">Don't have an account?</p>
        <Link to="/signup" className="text-sm underline hover:no-underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
