import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import DeactivateAccountModal from "../components/modals/DeactivateAccountModal";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import AntButton from "../components/Button";
import {
  useEditUserProfile,
  useGetProfile,
  useUpdateUserPhoto,
} from "../services/userProfileService";
import { useAuthStore } from "../store/useAuth";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";
import Header from "../components/Header";
const PLACEHOLDER_IMAGE =
  "https://via.assets.so/img.jpg?w=184&h=184&bg=e5e7eb&f=png";
const DOMAIN_URL = import.meta.env.VITE_API_BASE_URL_NO_VERSION;

const EditProfile = () => {
  const isInitialized = useRef(false);
  const [formData, setFormData] = useState({
    display_name: "",
    age: "",
    email: "",
  });

  const [ageFocused, setAgeFocused] = useState(false);
  const [userNameFocused, setUserNameFocused] = useState(false);

  const { userData: profile, setUserData } = useAuthStore();
  const { isLoading } = useGetProfile();
  const editProfileMutation = useEditUserProfile();
  const updateUserPhoto = useUpdateUserPhoto();

  useEffect(() => {
    if (profile && !isInitialized.current) {
      setTimeout(() => {
        setFormData({
          display_name: profile.display_name || "",
          age: profile.age || "",
          email: profile.email || "",
        });
      }, 0);
      isInitialized.current = true;
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editProfileMutation.mutateAsync(
        {
          display_name: formData.display_name,
          age: parseInt(formData.age) || 0,
        },
        {
          onSuccess: (data) => {
            setUserData(data.data);
            console.log(data.data);
          },
        },
      );

      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Failed:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      message.error(errorMessage);
    }
  };

  return (
    <div className="text-primary w-full h-full flex flex-col items-start pt-10 ">
      <div className="w-full flex justify-center">
        <div className="w-full flex flex-col justify-center gap-6">
          <Header
            title="Edit Profile"
            subtitle="Manage your personal information."
          />
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
          <div className="w-8/12 flex flex-col items-center justify-center gap-2">
            {isLoading ? (
              <div className="w-full flex justify-center items-center py-10">
                <p className="text-gray-500">Loading profile...</p>
              </div>
            ) : (
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <div className="relative w-full">
                  <label
                    className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                      userNameFocused || formData.display_name
                        ? "-top-2.5 text-xs  bg-white px-1"
                        : "top-1/2 -translate-y-1/2 text-md"
                    }`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="display_name"
                    onFocus={() => setUserNameFocused(true)}
                    onBlur={() => setUserNameFocused(false)}
                    value={formData.display_name}
                    onChange={handleInputChange}
                    className="border! border-black! focus:outline-none! outline-none! bg-white! w-full p-2"
                  />
                </div>
                <div className="relative w-full">
                  <label
                    className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                      ageFocused || formData.age
                        ? "-top-2.5 text-xs  bg-white px-1"
                        : "top-1/2 -translate-y-1/2 text-md"
                    }`}
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    onFocus={() => setAgeFocused(true)}
                    onBlur={() => setAgeFocused(false)}
                    value={formData.age}
                    onChange={handleInputChange}
                    className="border! border-black! focus:outline-none! outline-none! bg-white! w-full p-2"
                  />
                </div>
                <div className="relative w-full">
                  <label
                    className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                      formData.email
                        ? "-top-2.5 text-xs  bg-white px-1"
                        : "top-1/2 -translate-y-1/2 text-md"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border! border-black! focus:outline-none! outline-none! bg-white! w-full p-2"
                    disabled
                    title="Email cannot be changed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={editProfileMutation.isPending}
                  className=" cursor-pointer w-6/12 text-white border-2 bg-secondary py-2 px-2 text-md font-bold rounded-[10px] disabled:opacity-50"
                >
                  {editProfileMutation.isPending
                    ? "Updating..."
                    : "Update Account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
