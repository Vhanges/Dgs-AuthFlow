import { useCallback } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { googleLogin } from "../services/auth";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { formData, errorMessage, isPending, handleChange, handleSubmit } =
    useLogin();

  const handleGoogleLogin = useCallback((e) => {
    e.preventDefault();
    googleLogin();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-md mx-auto px-8"
      noValidate
    >
      <Header title="Login" subtitle="Enter email and password" />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full gap-3">
          <FormInput
            icon={MdOutlineMailOutline}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isPending}
            required
          />

          <FormInput
            icon={MdLockOutline}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            disabled={isPending}
            required
          />
        </div>

        <div className="w-full flex justify-between items-center">
          {errorMessage && (
            <p className="text-red-600 text-sm" role="alert">
              {errorMessage}
            </p>
          )}
          <Link
            className="italic font-medium text-xs text-black ml-auto hover:underline"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <Button type="submit" disabled={isPending} variant="primary">
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <Divider />

        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isPending}
          variant="secondary"
          icon={FaGoogle}
        >
          <span className="text-sm font-medium">Sign in with Google</span>
        </Button>
      </div>

      <div className="flex gap-2 justify-center items-center mt-6">
        <p className="text-sm">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-sm text-black underline hover:no-underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Login;
