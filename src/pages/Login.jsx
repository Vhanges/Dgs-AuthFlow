import logo from "../assets/logo.png";
import Header from "../components/Header";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { googleLogin } from "../services/auth";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, error } = useLogin();

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
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        window.location.href = "/profile";
      },
    });
  };

  return (
    <div className="w-full h-screen bg-[#fbfbfb] ">
      <div className="flex flex-col items-center bg-white h-full w-180 shadow-[0_0_25px_rgba(165,165,165,165)] py-15 gap-10">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} className="w-full h-9" alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full px-33.5"
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

            <div className="w-full flex justify-end">
              <a
                className="italic underline-none font-medium text-[12px]"
                href="#"
              >
                Forgot Password?
              </a>
            </div>

            {error && <p>{error}</p>}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="w-full px-25">
              <button
                type="submit"
                className={`cursor-pointer w-full p-2 bg-secondary rounded-md text-white font-bold text-md ${isPending ? "disable" : ""}`}
              >
                Login
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
            <a className="text-sm underline" href="">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
