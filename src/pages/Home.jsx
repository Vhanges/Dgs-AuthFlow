import { useMemo, useState } from "react";
import { useGetAllGalleryPhotos } from "../services/galleryService";
import { useAuthStore } from "../store/useAuth";
import { Button } from "antd";

import { Link } from "react-router-dom";
import UploadPhotoModal from "../components/modals/UploadPhotoModal";
const domainUrl = import.meta.env.VITE_API_BASE_URL_NO_VERSION;
const placeHolder = "https://via.assets.so/img.jpg?w=600&h=600&bg=e5e7eb&f=png";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const domain_url = import.meta.env.VITE_API_BASE_URL_NO_VERSION;
  const { data: gallery } = useGetAllGalleryPhotos();
  const test = true;
  const profile = useAuthStore((state) => state.userData);

  const galleryImages = useMemo(() => {
    const photos = Array.isArray(gallery)
      ? gallery
      : gallery?.photos || gallery?.data || [];

    return photos.map((item) => ({
      ...item,
      src: `${import.meta.env.VITE_API_BASE_URL}${item.url}`,
    }));
  }, [gallery]);

  return (
    <div
      className={`overflow-y-auto w-full flex flex-col mb-30 ${
        test ? "items-start justify-start" : "items-center justify-center"
      }  border`}
    >
      <div className="flex justify-start pl-25 items-center w-full gap-4">
        <img
          src={
            profile.avatar_url ? domainUrl + profile.avatar_url : placeHolder
          }
          alt="Place Holder"
          className="h-22 w-22 rounded-full"
        />
        <div className="flex flex-col gap-4">
          <h4 className="text-black text-4xl font-bold">
            {profile.display_name}
          </h4>
          <div className="w-full flex gap-2">
            <Button block>
              <Link to="/setting/edit-profile">Edit Profile</Link>
            </Button>
            <Button type="primary" block onClick={() => setIsModalOpen(true)}>
              Upload Photo
            </Button>
          </div>
        </div>
      </div>
      {galleryImages.length > 0 ? (
        <div className="px-25 w-full">
          <div className="grid grid-cols-3 w-full mt-10 gap-9.5 py-10 border-t border-gray-200">
            {galleryImages.map((item) => (
              <div
                key={item.photo_id}
                className="h-60 rounded-lg overflow-hidden"
              >
                <img
                  src={domain_url + item.url}
                  alt={`photo-${item.photo_id}`}
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center h-screen px-25 w-full">
          <div className="flex flex-col gap-3 items-center justify-center h-screen px-10 w-full border-t mt-10  border-black"></div>
        </div>
      )}
      <UploadPhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
