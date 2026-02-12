import { Modal, Button } from 'antd';

export default function DeactivateAccountModal({openModal, onClose}) {

    return (
        <Modal
            title={<h1 className='text-3xl font-bold text-primary mb-5'>Deactivate Account</h1>}
            open={openModal}
            onCancel={onClose}
            footer={
                <div className="w-full flex justify-center mt-10 gap-3">
                    <button className="w-6/12 font-bold text-red-400 border-2 border-red-400 rounded-sm text-md py-2 px-5">
                       Deactivate my account a
                    </button>
                    <button
                        onClick={onClose} 
                        className="w-6/12 font-bold text-white bg-secondary rounded-sm text-md py-2 px-5">
                        Cancel 
                    </button>
                </div>
            }
        >
            <p className='text-lg'>Are you sure you want to deactivate your account?</p>
        </Modal>
    );
}
