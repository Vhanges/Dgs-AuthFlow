import { Modal, Form, Upload, message, Button } from "antd";
import { DownloadOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUploadGalleryPhotos } from "../../services/galleryService";
import { useAuthStore } from "../../store/useAuth";


const UploadPhotoModal = ({ isOpen, onClose}) => {
  const [form] = Form.useForm();
  const { accessToken } = useAuthStore();
  const uploadMutation = useUploadGalleryPhotos();
  
  // We use this merely to trigger re-renders for the preview
  const fileList = Form.useWatch("photos", form);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const filesToUpload = values.photos.map(file => file.originFileObj);

      await uploadMutation.mutate({
        token: accessToken,
        photos: filesToUpload
      });

      message.success("Photos uploaded successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Upload Failed:", error);
      message.error(error.response?.data?.message || "Failed to upload photos");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <Modal
      open={isOpen}
      title={<h1 className="text-primary text-3xl mb-5">Upload photo</h1>}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="mr-2">
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          onCancel={onClose}
          loading={uploadMutation.isPending}
          className="bg-secondary text-white"
        >
          Upload Photos
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Visual Header Box */}
        <div style={{
          background: "linear-gradient(135deg, #fffbe6 0%, #fff9e6 100%)",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #ffd666",
          marginBottom: "24px"
        }}>
          <div className="flex items-center gap-3 mb-3">
             <UploadOutlined style={{ fontSize: "20px", color: "#d48806" }} />
             <h3 className="text-[#1c3c6d] font-bold text-lg m-0">Gallery Photos</h3>
          </div>
          <p className="text-gray-500 text-sm">Upload your photos to the gallery (multiple images allowed).</p>

          <Form.Item
            name="photos"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload at least one photo" }]}
          >
            <Upload.Dragger
              accept="image/*"
              multiple
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error(`${file.name} is not an image file`);
                  return Upload.LIST_IGNORE;
                }
                return false; // Prevent auto-upload
              }}
              showUploadList={false} // We build a custom preview below
              className="bg-white rounded-xl p-5"
            >
              {fileList && fileList.length > 0 ? (
                // Custom Preview State for Multiple Images
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {fileList.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file.originFileObj)}
                          alt={`preview-${index}`}
                          className="w-full h-24 object-cover rounded-md border-2 border-green-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-green-600 font-medium text-center">
                     ✓ {fileList.length} photo{fileList.length > 1 ? 's' : ''} ready to upload
                  </div>
                  <p className="text-gray-500 text-sm text-center">Click or drag more files to add</p>
                </div>
              ) : (
                // Empty State
                <>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag files to upload</p>
                  <p className="ant-upload-hint">Support for multiple image uploads</p>
                </>
              )}
            </Upload.Dragger>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UploadPhotoModal;