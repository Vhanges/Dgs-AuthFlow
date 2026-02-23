import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeFilled,
  SettingFilled,
  MessageFilled,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useLogout } from "../services/useAuth";
import { useAuthStore } from "../store/useAuth";
import { Button } from "antd";
const domainUrl = import.meta.env.VITE_API_BASE_URL_NO_VERSION;

const MainLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const profile = useAuthStore((state) => state.userData);

  const clearAuth = useAuthStore((state) => state.logout);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    clearAuth();

    navigate("/login", { replace: true });

    logoutMutation.mutate();
  };
  return (
    <div className="p-2 h-screen text-white w-full flex relative">
      <div className="pr-2 flex flex-col justify-between items-center">
        <div className="flex flex-col">
          <Link
            className={clsx(
              "text-black! flex items-center justify-center p-5 rounded-md w-0 h-0",
              pathname === "/setting/edit-profile"
                ? "bg-primary! text-white!"
                : " hover:bg-primary!  hover:text-white!",
            )}
            to="/chat"
          >
            <MessageFilled className="text-xl" />
          </Link>
          <Link
            className={clsx(
              "text-black! flex items-center justify-center p-5 rounded-md w-0 h-0",
              pathname === "/setting/edit-profile"
                ? "bg-primary! text-white!"
                : " hover:bg-primary!  hover:text-white!",
            )}
            to="/home"
          >
            <HomeFilled className="text-xl" />
          </Link>
          <Link
            className={clsx(
              "text-black! flex items-center justify-center p-5 rounded-md w-0 h-0",
              pathname === "/setting/account-option"
                ? "bg-primary! text-white!"
                : "hover:bg-primary! hover:text-white!",
            )}
            to="/setting/account-option"
          >
            <SettingFilled className="text-xl" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          {profile.avatar_url ? (
            <Link to="/edit-profile">
              <img
                src={domainUrl + profile.avatar_url}
                alt="Place Holder"
                className="h-8 w-8 rounded-full"
              />
            </Link>
          ) : (
            <div className="h-8 w-8 p-4 bg-gray-200 flex rounded-full justify-center items-center">
              <UserOutlined className="text-md text-gray-700!" />
            </div>
          )}
          <Button
            onClick={handleLogout}
            className="flex bg-primary! gap-2 p-4 text-md font-medium
            rounded-full! h-8 w-8 justify-center items-center"
          >
            <LoginOutlined className="text-md! text-white!" />
          </Button>
        </div>
      </div>

      <div
        className={`overflow-y-auto w-full flex flex-col pt-6 border rounded-md border-black px-10 
          items-start justify-start`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
