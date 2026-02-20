import { Modal } from "antd";
import { Checkbox } from "antd";

export default function DeactivationImpactInfo({
  openModal,
  onClose,
  onProceed,
}) {
  return (
    <Modal
      title={
        <h1 className="text-3xl font-bold text-dark-gray mb-5">
          Before you proceed...
        </h1>
      }
      open={openModal}
      onCancel={onClose}
      footer={
        <div className="w-full flex justify-center mt-10 gap-3">
          <button
            onClick={() => {
              onProceed();
              onClose();
            }}
            className="w-6/12 font-bold text-red-400 border-2 border-red-400 rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Continue to deactivation
          </button>
          <button
            onClick={onClose}
            className="w-6/12 font-bold text-white bg-secondary rounded-sm text-md py-2 px-5 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          To proceed, please acknowledge that your account will be temporarily
          deactivated. You can reactivate it anytime by logging back in.
        </p>

        <div className="flex flex-col gap-4">
          <Checkbox className="text-sm font-medium text-gray-900">
            I understand that my account will be hidden from others.
          </Checkbox>
          <Checkbox className="text-sm font-medium text-gray-900">
            I understand that I can reactivate my account anytime.
          </Checkbox>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 italic leading-relaxed">
            * Your account will be hidden immediately, but remains recoverable.
            Simply log back in to activate the account back again.
            <br />
            <br />
            <p>
              To know more about this process, click this link:
              <br />
              <a href="https://youtu.be/Aq5WXmQQooo?si=HMI24Z2IIoJDSKRX">
                FAQs about account deletion
              </a>
            </p>
          </p>
        </div>
      </div>
    </Modal>
  );
}
