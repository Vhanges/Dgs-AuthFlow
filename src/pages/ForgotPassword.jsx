import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Modal } from "antd";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPassword = () => {
  const {
    email,
    errorMessage,
    isModalOpen,
    isPending,
    handleEmailChange,
    handleSubmit,
    closeModal,
  } = useForgotPassword();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        noValidate
      >
        <Header
          title="Forgot Password"
          subtitle="The instructions will be sent on the email you provide."
        />

        <div className="flex flex-col gap-3">
          <FormInput
            icon={MdOutlineMailOutline}
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            disabled={isPending}
            required
          />

          {errorMessage && (
            <div className="w-full">
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button type="submit" disabled={isPending} variant="primary">
            {isPending ? "Sending Email..." : "Send Reset Link"}
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
          <p>A reset link has been sent to your email.</p>
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

export default ForgotPassword;
