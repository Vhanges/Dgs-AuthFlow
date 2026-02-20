import { Modal, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function DeactivationResult({ 
  openModal, 
  status = "success",
  errorMessage, 
}) {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Modal 
      open={openModal} 
      footer={null} 
      centered 
      closable={false}
      width={500}
    >
      {status === "success" ? (
        <Result
          status="success"
          title={<span className="font-bold text-gray-900">Account Deactivated</span>}
          subTitle={
            <div className="space-y-2 text-gray-600">
              <p>Your account has been successfully deactivated.</p>
              <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-100">
                You can reactivate your account anytime by logging back in.
              </p>
            </div>
          }
          extra={[
            <Button 
              onClick={handleReturn}
              type="primary" 
              key="login" 
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
            >
              Return to Login
            </Button>
          ]}
        />
      ) : (
        <Result
          status="error"
          title={<span className="font-bold text-gray-900">Deactivation Failed</span>}
          subTitle={errorMessage || "An error occurred while processing your request."}
          extra={[
            <Button 
              onClick={handleReturn}
              type="primary" 
              key="login" 
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
            >
              Return to Login
            </Button>
          ]}
        />
      )}
    </Modal>
  );
}