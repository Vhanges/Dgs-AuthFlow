import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "../../services/userProfileService";
import { useAuthStore } from "../../store/useAuth";

export default function DeleteAccountModal({ openModal, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const deleteAccountMutation = useDeleteAccount();

  const handleDelete = async () => {
    try {
      await deleteAccountMutation.mutateAsync();

      // Wait 3 seconds before logging out
      setTimeout(async () => {
        // Logout and clear all user data
        logout();
        message.success({
          content:
            "Your account has been deleted. You will be logged out shortly.",
          duration: 3,
        });
        // Redirect to login page
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Deletion of Account Failed:", error);
      message.error(
        error.response?.data?.message || "Failed to deactivate account",
      );
    }
  };

  return (
    <Modal
      title={
        <h1 className="text-3xl font-bold text-primary mb-5">
          Delete Account
        </h1>
      }
      open={openModal}
      onCancel={onClose}
      footer={
        <div className="w-full flex justify-center mt-10 gap-3">
          <button
            onClick={handleDelete}
            disabled={deleteAccountMutation.isPending}
            className="w-6/12 font-bold text-red-400 border-2 border-red-400 rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            {deleteAccountMutation.isPending
              ? "Deleting..."
              : "Delete my account"}
          </button>
          <button
            onClick={onClose}
            disabled={deleteAccountMutation.isPending}
            className="w-6/12 font-bold text-white bg-secondary rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      }
    >
      <p className="text-lg">
        Are you sure you want to delete your account?
      </p>
      <p className="text-sm text-gray-500 mt-2">
        This action will log you out and deactivate your account.
      </p>
    </Modal>
  );
}
