import { useQuery } from "@tanstack/react-query";
import profile from "../services/userProfileService";
import { useAuthStore } from "../store/useAuth";

const useProfile = () => {
  const userData = useAuthStore((state) => state.userData);

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => profile.getProfile(),
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });
};

export default useProfile;
