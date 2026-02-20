import { Modal } from "antd";
import { useDeactivateAccount } from "../../../services/useAuth";

export default function DeactivationFinalConfirmation({
  openModal,
  onClose,
  onConfirm,
  result,
}) {
  const deactivateAccountMutation = useDeactivateAccount();

  const handleDeactivate = async () => {
    try {
      const response = await deactivateAccountMutation.mutateAsync();
      result({
        status: "success",
        message:
          response?.message ||
          "Your account has been successfully deactivated. You can reactivate it anytime by logging back in.",
      });
      onConfirm();
    } catch (error) {
      onConfirm();
      result({
        status: "error",
        message:
          error.response?.data?.message ||
          "An error occurred while processing your request. Please try again later.",
      });
    }
  };

  return (
    <Modal
      title={
        <h1 className="text-3xl font-bold text-dark-gray mb-5">
          Confirm Deactivation
        </h1>
      }
      open={openModal}
      onCancel={onClose}
      footer={
        <div className="w-full flex justify-center mt-10 gap-3">
          <button
            onClick={onClose}
            className="w-6/12 font-bold text-dark-gray rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeactivate}
            className="w-6/12 font-bold text-white bg-red-500 rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Deactivate
          </button>
        </div>
      }
    >
      <p className="text-sm text-gray-600 leading-relaxed">
        Are you sure you want to deactivate your account? You can reactivate it anytime by logging back in.
      </p>
    </Modal>
  );
}