import { Modal } from "antd";
import {
  useDeleteAccount,
  useGoogleDeleteAccount,
} from "../../../services/useAuth";

export default function DeletionFinalConfirmation({
  openModal,
  onClose,
  onConfirm,
  isGoogleAccount,
  result,
}) {
  const deleteAccountMutation = useDeleteAccount();
  const googleDeleteAccountMutation = useGoogleDeleteAccount();

  const handleDelete = async () => {
    try {
      const response = await deleteAccountMutation.mutateAsync();
      result({
        status: "success",
        message:
          response?.message ||
          "Your account has been deactivated. You have 30 days to restore your data before it is permanently removed from our servers.",
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

  const handleGoogleDelete = async () => {
    try {
      const response = await googleDeleteAccountMutation.mutateAsync();
      onConfirm();
      result({
        status: "success",
        message:
          response?.message ||
          "A confirmation email has been sent to your Google account inbox. Please follow the instructions to complete the deactivation.",
      });
    } catch (error) {
      onClose();
      result({
        status: "error",
        message:
          error.response?.data?.message ||
          "Failed to send the deletion confirmation email.",
      });
    }
  };

  if (isGoogleAccount) {
    return (
      <Modal
        title={
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">
              Google Account Deactivation
            </h1>
          </div>
        }
        open={openModal}
        onCancel={onClose}
        centered
        footer={
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGoogleDelete}
              disabled={googleDeleteAccountMutation.isPending}
              className="flex-1 px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
            >
              {googleDeleteAccountMutation.isPending ? "Sending..." : "Send Email"}
            </button>
          </div>
        }
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          To finalize this process, we need to verify your identity through your
          Google-linked email. A confirmation link will be sent shortly.
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      title={
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Final Confirmation
          </h1>
        </div>
      }
      open={openModal}
      onCancel={onClose}
      centered
      footer={
        <div className="flex gap-3 pt-6">
          <button
            onClick={onClose}
            disabled={deleteAccountMutation.isPending}
            className="flex-1 px-4 py-2 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-base transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteAccountMutation.isPending}
            className="flex-1 px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-md text-base transition-colors disabled:opacity-50"
          >
            {deleteAccountMutation.isPending ? "Processing..." : "Deactivate Account"}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
            Confirm Account Deactivation
          </h3>
          <p className="text-sm text-gray-500">
            This action will hide your profile and begin the 30-day removal
            countdown.
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-5 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 mb-2">
              The 30-Day Policy
            </h4>
            <p className="text-sm leading-relaxed text-amber-900">
              Your account will be{" "}
              <span className="font-semibold">deactivated and hidden</span>{" "}
              immediately. You have{" "}
              <span className="font-bold">30 days</span> to restore your data—simply
              log back in to cancel this request. After this period, your
              information will be purged permanently.
            </p>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 mb-2">
              What will be hidden
            </h4>
            <ul className="text-sm space-y-2 text-amber-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Personal profile and identity information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Associated media and uploaded content</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}