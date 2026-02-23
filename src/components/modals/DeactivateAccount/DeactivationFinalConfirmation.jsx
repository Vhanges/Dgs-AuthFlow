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
      result({
        status: "error",
        message:
          error.response?.data?.message ||
          "An error occurred while processing your request. Please try again later.",
      });
      onConfirm();
    }
  };

return (
    <Modal
        title={null}
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
