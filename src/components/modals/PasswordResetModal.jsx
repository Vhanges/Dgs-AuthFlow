import { Link } from "react-router-dom";
import { Modal, Button } from "antd";

const PasswordResetModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Password Reset Successfully"
      open={isOpen}
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
          onClick={onClose}
        >
          <Button type="primary" size="large">
            Okay
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
