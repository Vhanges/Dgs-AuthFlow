import { Modal } from "antd";
import { Checkbox } from "antd";

export default function DeletionImpactInfo({ openModal, onClose, onProceed }) {
  return (
    <Modal
      title={
        <h1 className="text-3xl font-bold text-dark-gray mb-5">
          Before you go...
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
            Continue to deletion
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
          To proceed, please acknowledge that the following assets will be
          <span className="text-red-600 font-medium px-1">
            permanently removed
          </span>
          from our servers:
        </p>

        <div className="flex flex-col gap-4">
          {/* TODO: Create an endpoint to identify the checked out data that consented to be deleted */}
          <Checkbox className="text-sm font-medium text-gray-900">
            Removal of uploaded photos and associated metadata
          </Checkbox>
          <Checkbox className="text-sm font-medium text-gray-900">
            Deletion of all activity logs and personal information
          </Checkbox>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 italic leading-relaxed">
            * Your account will be hidden immediately, but remains recoverable
            for 30 days. Simply log back in before the period ends to cancel
            this request.
            <br />
            <br />
            <p>
              To know more about this process, click this link: <br />{" "}
              <a href="/terms-and-condition">FAQs about account deletion </a>
            </p>
          </p>
        </div>
      </div>
    </Modal>
  );
}
