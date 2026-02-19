import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount, useGoogleDeleteAccount } from "../../../services/userProfileService";
import { useAuthStore } from "../../../store/useAuth";

export default function DeletionFinalConfirmation({ openModal, onClose, isGoogleAccount }) {
  const navigate = useNavigate();
  const { logout, deletionToken, clearDeletionToken } = useAuthStore();
  const deleteAccountMutation = useDeleteAccount();
  const googleDeleteAccountMutation = useGoogleDeleteAccount();

  const handleDelete = async () => {
    try {
      // Delete account with verification token
      const response = await deleteAccountMutation.mutateAsync(
        deletionToken
      );

      message.success({
        content:
          response.message || "Your account has been deleted. You will be logged out shortly.",
        duration: 3,
      });
      
      clearDeletionToken();
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Deletion Failed:", error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        message.error(
          "Verification token has expired. Please try again."
        );
        onClose(); // Close modal to restart the process
      } else if (error.response?.status === 403) {
        message.error("Session expired. Please log in again.");
        logout();
        navigate("/login");
      } else {
        message.error(
          error.response?.data?.message || "Failed to delete account"
        );
      }
    }
  };

  const handleGoogleDelete = async () => {
    try {
      const response = await googleDeleteAccountMutation.mutateAsync();
      console.log("Google Deletion Response:", response);
      message.success({
        content: response?.message || "Google account deletion email sent successfully.",
        duration: 3,
      });
      onClose();
    } catch (error) {
      console.error("Google Deletion Failed:", error);
      message.error(  
        error.response?.data?.message || "Failed to send deletion email."
      );
    }
  };

  if (isGoogleAccount) {
    return (
      <Modal
        title="Google Account Deletion"
        open={openModal}
        onCancel={onClose}
        centered
        footer={
          <button
            onClick={handleGoogleDelete}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Send Deletion Email
          </button>
        }
      >
        <p>
          A confirmation email will be sent to your Google account email address.
          Please follow the instructions in the email to complete the deletion process.
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
            className="flex-1 px-4 py-2 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteAccountMutation.isPending}
            className="flex-1 px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-900 rounded-md text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteAccountMutation.isPending ? (
              <>
                <span className="inline-block mr-2">⏳</span>
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-red-400 tracking-tight">
            Confirm Account Deletion
          </h3>
          <p className="text-sm text-gray-500">
            This action will initiate the process of permanently removing your data.
          </p>
        </div>

        <div className="bg-gray-50 border-l-4 border-yellow-200 p-5 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              The 30-Day Policy
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Your account will be <span className="font-semibold text-gray-900">deleted and hidden</span> immediately. 
              You have <span className="font-bold text-primary">30 days</span> to change your mind—simply log back in to restore your data. After this period, 
              your information will be purged permanently.
            </p>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              What will be removed
            </h4>
            <ul className="text-sm space-y-2 text-gray-600">
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
