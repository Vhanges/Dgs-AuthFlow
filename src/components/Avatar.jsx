import { useUpdateUserPhoto } from "../services/userProfileService";
import { useAuthStore } from "../store/useAuth";
import { message } from "antd";
const PLACEHOLDER_IMAGE =
  "https://via.assets.so/img.jpg?w=184&h=184&bg=e5e7eb&f=png";
const DOMAIN_URL = import.meta.env.VITE_API_BASE_URL_NO_VERSION;

const Avatar = () => {
  const updateUserPhoto = useUpdateUserPhoto();
  const { userData: profile, setUserData } = useAuthStore();

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      await updateUserPhoto.mutateAsync(file, {
        onSuccess: async (data) => {
          console.log("hello1", data);
          setUserData(data.data);
        },
      });

      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Updated Failed", error);
      const errorMessage =
        error.response?.data?.message || "Updating profile failed";
      message.error(errorMessage);
    }
  };
  return (
    <div className="w-full flex items-center gap-4">
      <img
        src={
          profile?.avatar_url
            ? DOMAIN_URL + profile?.avatar_url
            : PLACEHOLDER_IMAGE
        }
        alt="Profile"
        className="h-28 w-28 rounded-full"
      />
      <label className="w-fit cursor-pointer text-secondary border-2 border-secondary py-2 px-2 text-sm rounded-[10px] text-center">
        Upload new photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePhotoUpload}
        />
      </label>
    </div>
  );
};

export default Avatar;
