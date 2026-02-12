import { Modal, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const { Dragger } = Upload;

const UploadPhotoModal = ({ isOpen, onClose }) => {
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Modal
            title={<h1 className='text-primary text-3xl mb-5'>Upload photo</h1>}
            open={isOpen}
            onCancel={onClose}
            footer={[
                <button className="font-bold text-secondary border-2 border-secondary rounded-sm text-md py-2 px-5 mr-4" key="cancel" onClick={onClose}>
                    Cancel
                </button>,
                <button className="font-bold bg-secondary` text-white rounded-sm text-md py-2 px-5" key="upload" type="primary">
                    Upload Photo
                </button>,
            ]}
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </p>
            </Dragger>
        </Modal>
    );
};

export default UploadPhotoModal;
