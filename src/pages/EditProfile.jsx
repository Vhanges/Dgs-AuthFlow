import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import DeactivateAccountModal from "../components/modals/DeactivateAccountModal";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import AntButton from "../components/Button";
import useProfile from "../hooks/useProfile";
import { useEditUserProfile } from "../services/userProfileService";

const EditProfile = () => {
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const isInitialized = useRef(false);
  
  // Fetch profile data
  const profileQuery = useProfile();
  const editProfileMutation = useEditUserProfile();

  // Form state
  const [formData, setFormData] = useState({
    display_name: "",
    age: "",
    email: ""
  });

  // Update form data when profile loads (only once)
  useEffect(() => {
    if (profileQuery.data && !isInitialized.current) {
      setFormData({
        display_name: profileQuery.data.display_name || "",
        age: profileQuery.data.age || "",
        email: profileQuery.data.email || ""
      });
      isInitialized.current = true;
    }
  }, [profileQuery.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearAll = () => {
    setFormData({
      display_name: "",
      age: "",
      email: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await editProfileMutation.mutateAsync({
        display_name: formData.display_name,
        age: parseInt(formData.age) || 0
      });

      message.success("Profile updated successfully!");
      
      // Refetch profile data
      profileQuery.refetch();
    } catch (error) {
      console.error("Update Failed:", error);
      message.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="text-primary w-full h-screen flex flex-col items-start py-10">
      <Link to={"/home"}>
        <div className="w-full flex flex-row gap-2">
          <ArrowLeftOutlined />
          <p>Back to profile</p>
        </div>
      </Link>
    
      <div className="w-full h-8/12 flex justify-center ">
        <div className="w-3xl h-full flex justify-center">
          <div className="w-4/12 h-full flex items-center">
            <span className="w-fit h-fit flex flex-col items-center gap-2">
              <img
                src="https://via.assets.so/img.jpg?w=184&h=184&bg=e5e7eb&f=png"
                alt="Place Holder"
                className="h-46 w-46 rounded-full"
              />
              <AntButton className="w-fit text-secondary border-2 border-secondary py-2 px-2 text-sm rounded-[10px]">
                Upload new photo
              </AntButton>
            </span>
          </div>
          <div className="w-8/12 h-full flex flex-col items-center justify-center gap-2">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-5xl font-bold">Edit Profile</h4>
              <button 
                type="button"
                onClick={handleClearAll}
                className="text-red-400 flex gap-2"
              >
                <DeleteOutlined />
                Clear all
              </button>
            </div>
            
            {profileQuery.isLoading ? (
              <div className="w-full flex justify-center items-center py-10">
                <p className="text-gray-500">Loading profile...</p>
              </div>
            ) : (
              <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleInputChange}
                  placeholder="Enter Username (e.g @superjames)"
                  className="w-full bg-gray-200 py-2 px-2 rounded-sm"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter Age (e.g 21)"
                  className="w-full bg-gray-200 py-2 px-2 rounded-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address (e.g jamesmith@gmail.com)"
                  className="w-full bg-gray-200 py-2 px-2 rounded-sm"
                  disabled
                  title="Email cannot be changed"
                />
                <span className="w-full flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDeactivateModal(true);
                    }}
                    className="w-6/12 text-red-400 border-2 border-red-400 py-2 px-2 text-md font-bold rounded-[10px]"
                  >
                    Deactivate Account
                  </button>
                  <button 
                    type="submit"
                    disabled={editProfileMutation.isPending}
                    className="w-6/12 text-white border-2 bg-secondary py-2 px-2 text-md font-bold rounded-[10px] disabled:opacity-50"
                  >
                    {editProfileMutation.isPending ? "Updating..." : "Update Account"}
                  </button>
                </span>
              </form>
            )}
          </div>
        </div>
      </div>

      <DeactivateAccountModal 
        openModal={openDeactivateModal} 
        onClose={() => setOpenDeactivateModal(false)} 
      />
    </div>
  );
};

export default EditProfile;
