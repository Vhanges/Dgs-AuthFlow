import { useState } from "react";
import Header from "../components/Header";
import DeactivateAccountModal from "../components/modals/DeactivateAccountModal";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";

const AccountOption = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  return (
    <div className="text-primary w-full h-full flex flex-col items-start pt-10 gap-4">
      <Header
        title="Account Option"
        subtitle="Choose what you want to do in your account."
      />
      <span className="w-full flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setOpenDeactivateModal(true)}
          className="cursor-pointer w-6/12 text-red-400 border-2 border-red-400 py-2 px-2 text-md font-bold rounded-[10px]"
        >
          Deactivate Account
        </button>
        <p className="text-sm text-gray-500 w-6/12">
          Temporarily disable your account. You can reactivate it anytime by
          logging back in.
        </p>
      </span>

      <Header
        title="Account Option"
        subtitle="Choose what you want to do in your account."
      />

      <span className="w-full flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setOpenDeleteModal(true)}
          className="cursor-pointer w-6/12 text-red-400 border-2 border-red-400 py-2 px-2 text-md font-bold rounded-[10px]"
        >
          Delete Account
        </button>
        <p className="text-sm text-gray-500 w-6/12">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
      </span>

      <DeactivateAccountModal
        openModal={openDeactivateModal}
        onClose={() => setOpenDeactivateModal(false)}
      />

      <DeleteAccountModal
        openModal={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </div>
  );
};

export default AccountOption;
