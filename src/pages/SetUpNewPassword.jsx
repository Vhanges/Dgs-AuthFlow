import { Link } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { Modal } from "antd";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import AntButton from "../components/Button";
import { useResetPassword } from "../hooks/useResetPassword";

const SetUpNewPassword = () => {
  const {
    formData,
    isModalOpen,
    isPending,
    handleChange,
    handleSubmit,
    closeModal,
  } = useResetPassword();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-8 pt-8"
        noValidate
      >
        <Header
          title="Set up a New Password"
          subtitle="Create a unique passphrase for every account to prevent a single breach from compromising all your data."
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full gap-3">
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
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <AntButton type="submit" disabled={isPending} variant="primary">
            {isPending ? "Resetting..." : "Confirm"}
          </AntButton>
        </div>
      </form>

      <Modal
        title="Password Reset Successfully"
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
          <p>You can now login with your new password.</p>
          <Link
            className="w-full flex justify-center items-center"
            to="/login"
            onClick={closeModal}
          >
            <AntButton variant="primary">Okay</AntButton>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default SetUpNewPassword;
