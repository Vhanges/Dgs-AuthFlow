import { Link, Outlet, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useAuthStore } from "../store/useAuth";
const domainUrl = import.meta.env.VITE_API_BASE_URL_NO_VERSION;

const MainLayout = () => {
  const { pathname } = useLocation();
  const profile = useAuthStore((state) => state.userData);

  return (
    <div className="text-white w-full flex gap-18 relative">
      <div className="pt-10 pb-5 h-screen flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <Link
            className={clsx(
              "text-black! flex items-center justify-center py-2 px-2 text-[14px]",
              pathname === "/setting/edit-profile"
                ? "bg-primary! text-white!"
                : " hover:bg-primary!  hover:text-white!",
            )}
            to="/setting/edit-profile"
          >
            Profile
          </Link>
          <Link
            className={clsx(
              "text-black! flex items-center justify-center py-2 px-2 text-[14px]",
              pathname === "/setting/account-option"
                ? "bg-primary! text-white!"
                : "hover:bg-primary! hover:text-white!",
            )}
            to="/setting/account-option"
          >
            Account
          </Link>
        </div>
        <div>
          {profile.avatar_url ? (
            <>
              {" "}
              <img
                src={domainUrl + profile.avatar_url}
                alt="Place Holder"
                className="h-10 w-10 rounded-full"
              />{" "}
              <Link
                to="/home"
                className="flex hover:bg-gray-200! gap-2 py-2 px-2 text-md font-medium justify-center items-center"
              >
                <HomeOutlined className="text-primary!" />
                <p className="text-primary text-[14px]">Home</p>
              </Link>
            </>
          ) : (
            <div className="h-10 w-10  rounded-full bg-gray-200 flex justify-center items-center">
              <UserOutlined className="text-md text-gray-700!" />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
