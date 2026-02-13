import { Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDeactivateAccount } from '../../services/userProfileService';
import { useAuthStore } from '../../store/useAuth';

export default function DeactivateAccountModal({openModal, onClose}) {
    const navigate = useNavigate();
    const { accessToken, logout } = useAuthStore();
    const deactivateMutation = useDeactivateAccount();

    const handleDeactivate = async () => {
        try {
            await deactivateMutation.mutateAsync(accessToken);
            
            // Show success message
            message.success({
                content: 'Your account has been deactivated. You will be logged out shortly.',
                duration: 3,
            });

            // Wait 3 seconds before logging out
            setTimeout(() => {
                // Logout and clear all user data
                logout();
                
                // Redirect to login page
                navigate('/login');
            }, 3000);
            
        } catch (error) {
            console.error("Deactivation Failed:", error);
            message.error(error.response?.data?.message || "Failed to deactivate account");
        }
    };

    return (
        <Modal
            title={<h1 className='text-3xl font-bold text-primary mb-5'>Deactivate Account</h1>}
            open={openModal}
            onCancel={onClose}
            footer={
                <div className="w-full flex justify-center mt-10 gap-3">
                    <button 
                        onClick={handleDeactivate}
                        disabled={deactivateMutation.isPending}
                        className="w-6/12 font-bold text-red-400 border-2 border-red-400 rounded-sm text-md py-2 px-5 disabled:opacity-50"
                    >
                       {deactivateMutation.isPending ? 'Deactivating...' : 'Deactivate my account'}
                    </button>
                    <button
                        onClick={onClose} 
                        disabled={deactivateMutation.isPending}
                        className="w-6/12 font-bold text-white bg-secondary rounded-sm text-md py-2 px-5 disabled:opacity-50">
                        Cancel 
                    </button>
                </div>
            }
        >
            <p className='text-lg'>Are you sure you want to deactivate your account?</p>
            <p className='text-sm text-gray-500 mt-2'>This action will log you out and deactivate your account.</p>
        </Modal>
    );
}
