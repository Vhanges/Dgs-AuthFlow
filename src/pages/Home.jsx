import { useMemo } from "react";
import { useGetAllGalleryPhotos } from "../services/galleryService";

const Home = () => {
  const domain_url = import.meta.env.VITE_API_BASE_URL_NO_VERSION;
  const { data: gallery, isLoading } = useGetAllGalleryPhotos();
  const test = true;

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
      className={`w-full h-[80vh] flex flex-col ${
        test ? "items-start justify-start" : "items-center justify-center"
      } rounded-xl border border-gray-300 shadow-2xl overflow-y-auto`}
    >
      <div className="w-full sticky top-0 z-10 p-5 bg-white border-b border-gray-200">
        <h4 className="text-primary text-2xl font-bold">Gallery</h4>
      </div>
      {isLoading ? (
        <div className="flex flex-wrap gap-4 justify-start p-10">
          <div className="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden"></div>
          <div className="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden"></div>
        </div>
      ) : galleryImages.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-start p-10">
          {galleryImages.map((item) => (
            <div
              key={item.photo_id}
              className="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden"
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
      ) : (
        <span className="flex flex-col gap-3 items-center flex-1 justify-center w-full">
          <h5 className="text-primary font-bold text-6xl">No Photos Yet</h5>
          <p className="text-primary font-bold text-2xl">
            Your work will be posted here.
          </p>
        </span>
      )}
    </div>
  );
};

export default Home;
