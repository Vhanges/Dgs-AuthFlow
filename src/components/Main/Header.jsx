import { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import UploadPhotoModal from "../modals/UploadPhotoModal";
import { useAuthStore } from "../../store/useAuth";
const DOMAIN_URL = import.meta.env.VITE_API_BASE_URL_NO_VERSION;
const PLACEHOLDER = "https://via.assets.so/img.jpg?w=600&h=600&bg=e5e7eb&f=png";

const Header = ({ headerOne, headerTwo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let activeHeader;

  const profile = useAuthStore((state) => state.userData);

  if (headerOne) {
    activeHeader = (
      <>
        <header className="w-[95%] h-fit bg-secondary flex items-center justify-between px-15 py-5 rounded-b-xl shadow-2xl top-0 z-15 sticky">
          <div className="flex flex-row items-center justify-center gap-3">
            <img
              src={
                profile.avatar_url
                  ? DOMAIN_URL + profile.avatar_url
                  : PLACEHOLDER
              }
              alt="Place Holder"
              className="h-32 w-32 rounded-full"
            />
            <span className="block ">
              <h5 className="text-3xl text-white font-bold">
                {profile?.display_name
                  ? "@" + profile.display_name
                  : "Super Unconfigured User"}
              </h5>
              <p>
                {profile?.age ?? ""} * {profile?.email ?? ""}
              </p>
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/edit-userData">
              <button className="w-50 text-white border-3 border-white py-2 font-bold text-xl rounded-[10px]">
                Edit
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-50 text-secondary bg-white py-2 font-bold text-xl rounded-[10px]"
            >
              Add Photo
            </button>
          </div>
        </header>

        <UploadPhotoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  } else if (headerTwo) {
    activeHeader = (
      <header className="w-full bg-gradient-header flex items-center justify-center p-5 top-0 z-10 sticky">
        <img
          src={Logo}
          alt="Global Tech Assessment and Training Center Inc."
          className=" h-12 "
        />
      </header>
    );
  }

  return <>{activeHeader}</>;
};

export default Header;
