import { useQuery } from "@tanstack/react-query";
import profile from "../services/profile";
import { useAuthStore } from "../store/useAuth";

const useProfile = () => {

    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
            queryKey: ["profile"],  
            queryFn: () => profile.getProfile(accessToken),
            enabled: !!accessToken, // Only run query if token exists
          })    

}

export default useProfile;