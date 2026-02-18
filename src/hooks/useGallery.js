import { useQuery } from "@tanstack/react-query";
import gallery from "../services/gallery";
import { useAuthStore } from "../store/useAuth";

const useGallery = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => gallery.getGallery(accessToken),
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
  });
};

export default useGallery;
