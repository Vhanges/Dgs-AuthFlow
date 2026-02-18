import { Button, Form, Input } from "antd";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { App } from "antd";
import AntButton from "../components/Button";
import Divider from "../components/Divider";
import Header from "../components/Header";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuthStore } from "../store/useAuth";
import { googleLogin, useLoginApi } from "../services/useAuth";

const Login = () => {
  const loginApi = useLoginApi();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const handleSubmit = (values) => {
    loginApi.mutate(values, {
      onSuccess: ({ data }) => {
        login(data.userData);
        navigate("/home");
      },
      onError: () => {
        if (values.password != values.userData) {
          notification.warning({
            message: "Wrong credentials",
            description: "The email and password is incorrect.",
            placement: "topRight",
          });
        }
      },
    });
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div
      className="flex flex-col gap-6 w-full max-w-md mx-auto px-8"
      noValidate
    >
      <Header title="Login" subtitle="Enter email and password" />
      <Form
        onFinish={handleSubmit}
        initialValues={{
          email: "famin64069@manupay.com",
          password: "password1234",
        }}
        layout="vertical"
        disabled={loginApi.isPending}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full gap-3">
            <Form.Item className="flex! flex-col! gap-4!">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email" },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "#797979" }} />}
                  placeholder="Email"
                  className="mb-2.5!"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
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
                />
              </Form.Item>
            </Form.Item>
          </div>

          <div className="w-full flex justify-between items-center">
            <Link
              className="cursor-pointer italic font-medium text-xs text-black! ml-auto hover:underline"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <center className="flex flex-col gap-4 items-center">
          <Button
            size="large"
            loading={loginApi.isPending}
            htmlType="submit"
            type="primary"
            block
            className="max-w-full"
          >
            {loginApi.isPending ? "Login" : "Logging In"}
          </Button>
          <Divider />
          <AntButton
            type="button"
            onClick={handleGoogleLogin}
            disabled={loginApi.isPending}
            variant="secondary"
            className="cursor-pointer bg-gray-300 flex justify-center items-center rounded-md p-2 gap-2"
          >
            <FaGoogle />
            <span className="text-sm font-medium pb-0.5">
              Sign in with Google
            </span>
          </AntButton>
        </center>
      </Form>

      <div className="flex gap-2 justify-center items-center mt-6">
        <p className="text-sm">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-sm text-black underline hover:no-underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
