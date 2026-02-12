import Header from "../components/Header";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { forgotPasswordRequest } from "../services/auth";
import { useState } from "react";
import { Modal } from "antd";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: (data) => {
      console.log("success", data);
      setIsModalOpen(true);
      setEmail("");
    },
    onError: () => {
      console.log("an error occur");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full px-36.5 pt-8"
    >
      <Header
        title="Forgot Password"
        subtitle="The instructions will be sent on the email you provide."
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full gap-3">
          <div className="relative">
            <MdOutlineMailOutline className="text-[#7E7E7E] absolute top-2.5 left-2 text-[17px]" />
            <input
              className="pl-8 py-2 w-full border-none outline-none border rounded-sm text-sm bg-[#f2f2f2]"
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-full px-25">
            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className={`cursor-pointer w-full p-2 bg-secondary rounded-md text-white font-bold text-md`}
            >
              {forgotPasswordMutation.isPending
                ? "Sending Email"
                : "Forgot Password"}
            </button>
          </div>
        </div>
        <div
          className="flex gap-1
             justify-center items-center"
        >
          <GoArrowLeft />
          <Link
            to="/login"
            className="flex text-sm justify-center items-center pb-0.5 text-black!"
          >
            Back to Login
          </Link>
        </div>
      </div>

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
          <p>A reset link has been sent.</p>
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

export default ForgotPassword;
