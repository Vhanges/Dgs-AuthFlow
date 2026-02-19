import { Button, Modal } from "antd";
import { Link } from "react-router-dom";

const SignUpModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Account Successfully Created"
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
        <p>Check your email to verify your account.</p>
        <Link
          className="w-full flex justify-center items-center"
          to="/login"
          onClick={onClose}
        >
          <Button type="primary" htmlType="submit" size="large" block>
            Okay
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default SignUpModal;
