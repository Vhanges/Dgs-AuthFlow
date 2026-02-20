import { Modal, Button, Result } from "antd";
import { useLogout } from "../../../services/useAuth";
import { useAuthStore } from "../../../store/useAuth";
import { useNavigate } from "react-router-dom";

export default function DeletionResult({ 
  openModal, 
  status = "success",
  errorMessage, 
}) {


  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const clearAuth = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    clearAuth();

    navigate("/login", { replace: true });

    logoutMutation.mutate();
  }

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
          title={<span className="font-bold text-gray-900">Account Scheduled for Deletion</span>}
          subTitle={
            <div className="space-y-2 text-gray-600">
              <p>Your account has been successfully scheduled for deletion.</p>
              <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-100">
                <strong>The 30-Day Grace Period:</strong> You have 30 days to restore your account and data by logging back in. After this period, your account will be permanently deleted.
              </p>
            </div>
          }
          extra={[
            <Button 
              onClick={() => handleLogout()}
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
          title={<span className="font-bold text-gray-900">Deletion Failed</span>}
          subTitle={
            <p className="text-gray-600">
              {errorMessage || "An unexpected error occurred. Please try again or contact support."}
            </p>
          }
          extra={[
            <Button 
              type="primary" 
              danger
              key="retry" 
              size="large"
              className="w-full h-12 text-base font-semibold"
            >
              Try Again
            </Button>
          ]}
        />
      )}
    </Modal>
  );
}