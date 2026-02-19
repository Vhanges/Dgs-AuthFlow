import { Link } from "react-router-dom";
import { Modal, Button } from "antd";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Password Reset Email Sent"
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
        <p>A reset link has been sent to your email.</p>
        <Link
          className="w-full flex justify-center items-center"
          to="/login"
          onClick={onClose}
        >
          <Button size="large" htmlType="submit" type="primary" block>
            Okay
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
