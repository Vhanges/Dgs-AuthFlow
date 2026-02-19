import { Modal, message, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useVerifyPasswordForDeletion } from "../../../services/userProfileService";
import { useAuthStore } from "../../../store/useAuth";

export default function DeletionAuthVerify({ openModal, onClose, onVerified }) {
  const [form] = Form.useForm();
  const verifyPasswordMutation = useVerifyPasswordForDeletion();
  const { setDeletionToken } = useAuthStore();

  const handleSubmit = async (values) => {
    try {
      const response = await verifyPasswordMutation.mutateAsync(
        values.password
      );
      
      // Check if verification was successful
      if (response.status === "success" && response.data?.verificationToken) {
        setDeletionToken(response.data.verificationToken);
        message.success("Password verified successfully");
        onVerified();
        onClose();
        form.resetFields();
      }
    } catch (error) {
      console.error("Verification Failed:", error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        message.error("Invalid password. Please try again.");
      } else if (error.response?.status === 400) {
        message.error(
          "This account uses Google Login. Password verification is not required."
        );
        // For Google accounts, proceed without token
        onVerified(null);
        onClose();
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
      footer={
        <div className="w-full flex justify-center mt-10 gap-3">
          <button
            onClick={onClose}
            disabled={verifyPasswordMutation.isPending}
            className="w-6/12 font-bold text-dark-gray rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={() => form.submit()}
            disabled={verifyPasswordMutation.isPending}
            className="w-6/12 font-bold text-red-400 border-2 border-red-400 rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            {verifyPasswordMutation.isPending ? "Verifying..." : "Submit"}
          </button>
        </div>
      }
    >
      <p className="my-3">
        Before we proceed with the deletion, please input your{" "}
        <strong>password</strong> so we can verify that it is really you.
      </p>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#797979" }} />}
              placeholder="Password"
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
