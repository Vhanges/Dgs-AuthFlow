import { useEffect } from "react";
import { useGetProfile } from "../services/userProfileService";
import { useAuthStore } from "../store/useAuth";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate, not Navigate

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuthStore();

  const { data, isSuccess } = useGetProfile({
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data.data);
      setUserData(data.data);
      navigate("/home");
    }
  }, [data, isSuccess, setUserData, navigate]);

  return <div>Google Redirect</div>;
};

export default GoogleRedirect;
