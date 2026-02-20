import { Modal, message, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useVerifyPassword } from "../../../services/useAuth";

export default function DeactivationAuthVerify({ openModal, onClose, onVerified }) {
  const [form] = Form.useForm();
  const verifyPasswordMutation = useVerifyPassword();

  const handleSubmit = async (values) => {
    try {
        await verifyPasswordMutation.mutateAsync(
          values.password, {
            onSuccess: () => {
              onVerified();
              onClose();
              form.resetFields();
            }
          }
        );
        
    } catch (error) {
      console.error("Verification Failed:", error);
      
      if (error.response?.status === 401) {
        message.error("Invalid password. Please try again.");
      } else {
        message.error(
          error.response?.data?.message || "Failed to verify identity"
        );
      }
    }
  };

  return (
    <Modal
      title={
        <h1 className="text-3xl font-bold text-dark-gray mb-5">
          Identity Verification
        </h1>
      }
      open={openModal}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label="Enter your password to proceed"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>
        <div className="w-full flex justify-center mt-10 gap-3">
          <button
            onClick={onClose}
            className="w-6/12 font-bold text-dark-gray rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-6/12 font-bold text-white bg-primary rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Verify
          </button>
        </div>
      </Form>
    </Modal>
  );
}