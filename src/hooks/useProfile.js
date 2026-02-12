import { useQuery } from "@tanstack/react-query";
import profile from "../services/profile";
import { useAuthStore } from "../store/useAuth";

const useProfile = () => {

    const token = useAuthStore((state) => state.refreshToken);
    // const {logout} = useAuthStore();    

    // return logout();
    return useQuery({
            queryKey: [
              "profile"
            ],  
            queryFn: profile.getProfile(token)
          })    

}

export default useProfile;