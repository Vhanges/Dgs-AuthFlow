import { useState, useEffect, useRef, useMemo } from "react";
import { Button, Form, Input, message } from "antd";
import { useEditUserProfile } from "../../services/userProfileService";
import { useAuthStore } from "../../store/useAuth";
import { pdf } from "@react-pdf/renderer";
import ProfilePDF from "./ProfilePDF";
import Heading from "../../components/Heading";
import Avatar from "../../components/Avatar";
import { useGetAllGalleryPhotos } from "../../services/galleryService";

const EditProfile = () => {
  const isInitialized = useRef(false);

  const [ageFocused, setAgeFocused] = useState(false);
  const [userNameFocused, setUserNameFocused] = useState(false);

  const { userData: profile, setUserData } = useAuthStore();
  const editProfileMutation = useEditUserProfile();

  const [formData, setFormData] = useState({
    display_name: "",
    age: "",
    email: `${profile.email}`,
  });

  const { data: gallery } = useGetAllGalleryPhotos();

  const galleryImages = useMemo(() => {
    const photos = Array.isArray(gallery)
      ? gallery
      : gallery?.photos || gallery?.data || [];

    return photos.map((item) => ({
      ...item,
      src: `${import.meta.env.VITE_API_BASE_URL}${item.url}`,
    }));
  }, [gallery]);

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

  const handlePreview = async () => {
    const blob = await pdf(
      <ProfilePDF profile={profile} galleryImages={galleryImages} />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    editProfileMutation.mutate(
      {
        display_name: formData.display_name,
        age: parseInt(formData.age) || 0,
      },
      {
        onSuccess: ({ data }) => {
          setUserData(data);
          console.log(data)
          setFormData({
            display_name: data.display_name || "",
            age: data.age || "",
          });
          message.success("Profile updated successfully!");
        },
        onError: (error) => {
          console.error("Update Failed:", error);
          const errorMessage =
            error.response?.data?.message || "Failed to update profile";
          message.error(errorMessage);
        },
      },
    );
  };

  return (
    <div className="text-primary w-full h-full flex flex-col items-start pt-10 ">
      <div className="w-full flex justify-center">
        <div className="w-full flex flex-col justify-center gap-6">
          <Heading
            title="Edit Profile"
            subtitle="Manage your personal information."
          />
          <Avatar />

          <div className="w-8/12 flex flex-col items-center justify-center gap-2">
            <Form
              className="w-full flex flex-col gap-4"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item name="display_name" className="relative w-full">
                <label
                  className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                    userNameFocused || formData.display_name
                      ? "-top-2.5 text-xs  bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  Username
                </label>
                <Input
                  name="display_name"
                  value={formData.display_name}
                  onFocus={() => setUserNameFocused(true)}
                  onBlur={() => setUserNameFocused(false)}
                  onChange={handleInputChange}
                  className="border! border-black! focus:outline-none! outline-none! bg-white! w-full p-2"
                />
              </Form.Item>
              <Form.Item name="age" className="relative w-full">
                <label
                  className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                    ageFocused || formData.age
                      ? "-top-2.5 text-xs  bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  Age
                </label>
                <Input
                  name="age"
                  value={formData.age}
                  onFocus={() => setAgeFocused(true)}
                  onBlur={() => setAgeFocused(false)}
                  onChange={handleInputChange}
                  className="border! border-black! focus:outline-none! outline-none! bg-white! w-full p-2"
                />
              </Form.Item>
              <Form.Item name="email" className="relative w-full">
                <label
                  className={`absolute left-3 transition-all  text-gray-400 duration-200 pointer-events-none z-10 ${
                    profile.email
                      ? "-top-2.5 text-xs  bg-white px-1"
                      : "top-1/2 -translate-y-1/2 text-md"
                  }`}
                >
                  Email
                </label>
                <Input
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="border! border-black! focus:outline-none! outline-none! bg-white! w-full p-2"
                  title="Email cannot be changed"
                  disabled
                />
              </Form.Item>
              <div className="flex gap-4">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    block
                    disabled={editProfileMutation.isPending}
                    className=" cursor-pointer text-white border-2 bg-secondary py-2 px-2 text-md font-bold rounded-[10px] disabled:opacity-50"
                  >
                    {editProfileMutation.isPending
                      ? "Updating..."
                      : "Update Account"}
                  </Button>
                </Form.Item>
                <Button
                  onClick={handlePreview}
                  block
                  className=" cursor-pointer text-white border-2 bg-secondary py-2 px-2 text-md font-bold rounded-[10px] disabled:opacity-50"
                >
                  Preview Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
