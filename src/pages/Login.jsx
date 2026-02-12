import Header from "../components/Header";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { googleLogin } from "../services/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isPending, error } = useLogin();
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: (response) => {
        // Use Zustand store instead of localStorage
        login(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.user || response.data.userData || {} // handle different API response formats
        );


        navigate('/home');
      },
      onError: (error) => {
        console.log(error);

        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full px-36.5"
    >
      <Header title="Login" subtitle="Enter email and password" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full gap-3">
          <div className="relative">
            <MdOutlineMailOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[17px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <MdLockOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[18px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>

        <div className="w-full flex justify-end relative">
          {error && (
            <p className="absolute text-red-600 text-sm left-0">
              {errorMessage}
            </p>
          )}
          <Link
            className="italic underline-none font-medium text-[12px] text-black!"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="w-full px-25">
          <button
            type="submit"
            className={`cursor-pointer w-full p-2 bg-secondary rounded-md text-white font-bold text-md ${isPending ? "disable" : ""}`}
          >
            {isPending ? "Logging in" : "Login"}
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 w-full px-20">
          <span className="flex-1 h-px bg-[#9b9b9b] rounded-md"></span>
          <span className="text-[14px] font-medium text-[#9b9b9b]">OR</span>
          <span className="flex-1 h-px bg-[#9b9b9b] "></span>
        </div>
        <div className="w-full px-25">
          <button
            onClick={googleLogin}
            className={`cursor-pointer w-full p-2 bg-[#E9E9E9] rounded-md flex justify-center items-center gap-2 ${isPending ? "disable" : ""}`}
          >
            <FaGoogle />
            <p className="text-sm justify-items-center font-medium">
              Sign in with Google
            </p>
          </button>
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center mt-6">
        <p className="text-sm">Don't have an account?</p>
        <Link to="/signup" className="text-sm text-black! underline!">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Login;
