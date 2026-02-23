import { Link, Outlet, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import clsx from "clsx";

const ChatLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="text-white w-full flex gap-18 relative">
      <div className="pt-10 pb-5 h-140.5 w-100 flex flex-col justify-between">
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
        <Link
          to="/home"
          className="flex hover:bg-gray-200! gap-2 py-2 px-2 text-md font-medium justify-center items-center"
        >
          <HomeOutlined className="text-primary!" />
          <p className="text-primary text-[14px]">Home</p>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default ChatLayout;
