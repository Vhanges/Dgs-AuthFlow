import { useState } from "react";
import Header from "../../components/Header";
import DeletionImpactInfo from "../../components/modals/DeleteAccount/DeletionImpactInfo";
import DeletionAuthVerify from "../../components/modals/DeleteAccount/DeletionAuthVerify";
import DeletionFinalConfirmation from "../../components/modals/DeleteAccount/DeletionFinalConfirmation";
import { useAuthStore } from "../../store/useAuth";

const AccountOption = () => {
  const [openAuthVerifyModal, setOpenAuthVerifyModal] = useState(false);
  const [openFinalConfirmModal, setOpenFinalConfirmModal] = useState(false);
  const [openImpactInfo, setOpenImpactInfo] = useState(false);
  const [isGoogleDeletion, setIsGoogleDeletion] = useState(false);

  const { userData: profile } = useAuthStore();

  const handleGoogleDeletion = () => {
    setIsGoogleDeletion(true);
    setOpenFinalConfirmModal(true);
  };
  return (
    <div className="text-primary w-full h-full flex flex-col items-start pt-10 gap-4">
      <Header
        title="Deactivate Account"
        subtitle="
          Temporarily disable your account. You can reactivate it anytime by
          logging back in."
      />
      <span className="w-full flex flex-col gap-1">
        <button
          type="button"
          className="cursor-pointer w-6/12 text-red-400 border-2 border-red-400 py-2 px-2 text-md font-bold rounded-[10px]"
        >
          Deactivate Account
        </button>
        <p className="text-sm text-gray-500 w-6/12"></p>
      </span>

      <Header
        title="Delete Account"
        subtitle="
          Permanently delete your account and all associated data. This action
          cannot be undone."
      />

      <span className="w-full flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setOpenImpactInfo(true)}
          className="cursor-pointer w-6/12 text-red-400 border-2 border-red-400 py-2 px-2 text-md font-bold rounded-[10px]"
        >
          Delete Account
        </button>
        <p className="text-sm text-gray-500 w-6/12"></p>
      </span>

      {openImpactInfo && (
        <DeletionImpactInfo
          openModal={openImpactInfo}
          onClose={() => setOpenImpactInfo(false)}
          onProceed={() => {
            if (!profile?.google_id) {
              setOpenAuthVerifyModal(true);
            } else {
              handleGoogleDeletion();
            }
          }}
        />
      )}

      {openAuthVerifyModal && (
        <DeletionAuthVerify
          openModal={openAuthVerifyModal}
          onClose={() => setOpenAuthVerifyModal(false)}
          onVerified={() => {
            setOpenAuthVerifyModal(false);
            setOpenFinalConfirmModal(true);
          }}
        />
      )}

      {openFinalConfirmModal && (
        <DeletionFinalConfirmation
          openModal={openFinalConfirmModal}
          onClose={() => {
            setOpenFinalConfirmModal(false);
            setIsGoogleDeletion(false);
          }}
          isGoogleAccount={isGoogleDeletion}
        />
      )}
    </div>
  );
};

export default AccountOption;
