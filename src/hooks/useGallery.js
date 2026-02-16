import { useQuery } from "@tanstack/react-query";
import gallery from "../services/galleryService";
import { useAuthStore } from "../store/useAuth";

const useGallery = () => {
    const userData = useAuthStore((state) => state.userData);

    return useQuery({
        queryKey: ["gallery"],  
        queryFn: () => gallery.getGallery(),
        enabled: !!userData,
        refetchOnWindowFocus: false,
    })    
}

export default useGallery;