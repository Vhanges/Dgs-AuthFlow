import { Link } from "react-router-dom";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Modal } from "antd";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useSignUp } from "../hooks/useSignup";

const SignUp = () => {
  const {
    formData,
    errorMessage,
    isModalOpen,
    isPending,
    handleChange,
    handleSubmit,
    closeModal,
  } = useSignUp();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        noValidate
      >
        <Header
          title="Sign Up"
          subtitle="Kindly fill up the needed information below"
        />

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

            <FormInput
              icon={MdLockOutline}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              disabled={isPending}
              required
            />
          </div>

          {errorMessage && (
            <div className="w-full flex justify-end">
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button type="submit" disabled={isPending} variant="primary">
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>

          <Link
            to="/login"
            className="flex justify-center items-center gap-1 text-sm text-black hover:underline mt-2"
          >
            <GoArrowLeft />
            <span>Back to Login</span>
          </Link>
        </div>
      </form>

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
            <Button variant="primary">Okay</Button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default SignUp;
