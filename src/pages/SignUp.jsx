import Header from "../components/Header";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignUp } from "../hooks/useSignup";
import { Modal } from "antd";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate, isPending } = useSignUp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      setErrorMessage("Password did not match.");

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    mutate(formData, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
      onError: (error) => {
        setErrorMessage(error.message || "An error occurred during signup");

        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full px-36.5 pt-8"
    >
      <Header
        title="Sign Up"
        subtitle="Kindly fill up the needed information below"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full gap-3">
          <div className="relative">
            <MdOutlineMailOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[17px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              placeholder="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="relative">
            <MdLockOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[18px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              type="password"
              name="password"
              id="password"
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="relative">
            <MdLockOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[18px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              placeholder="Confirm Password"
            />
          </div>

          <div className={`bg-white relative w-full`}>
            <p className="text-sm text-red-600 absolute right-0">
              {errorMessage}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-full px-25">
            <button
              type="submit"
              disabled={isPending}
              className={`cursor-pointer w-full p-2 bg-secondary rounded-md text-white font-bold text-md disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="flex gap-1 justify-center items-center">
          <GoArrowLeft />
          <Link
            to="/login"
            className="flex justify-center items-center text-sm pb-0.5 text-black!"
          >
            Back to Login
          </Link>
        </div>
      </div>

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
          <Link className="w-full flex justify-center items-center" to="/login">
            <button className="cursor-pointer w-full text-md rounded-md bg-secondary text-white font-bold p-2">
              Okay
            </button>
          </Link>
        </div>
      </Modal>
    </form>
  );
};

export default SignUp;
