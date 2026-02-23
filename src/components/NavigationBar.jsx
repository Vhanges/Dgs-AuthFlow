import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";
import { useLogout } from "../services/useAuth";
import iconLogo from "../assets/iconLogo.png";
import {
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const domainUrl = import.meta.env.VITE_API_BASE_URL_NO_VERSION;
const items = [
  {
    key: "1",
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

const NavigationBar = () => {
  const navigate = useNavigate();

  const profile = useAuthStore((state) => state.userData);
  const logoutMutation = useLogout();
  const clearAuth = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    clearAuth();

    navigate("/login", { replace: true });

    logoutMutation.mutate();
  };

  const handleMenuClick = ({ key }) => {
    if (key === "1") navigate("/setting/edit-profile");
    if (key === "2") handleLogout();
  };
  return (
    <header className="w-full h-fit bg-white/40 backdrop-blur flex items-center justify-between px-6 py-3 top-0 z-15 sticky">
      <div className="flex flex-row items-center justify-center gap-3">
        <img src={iconLogo} alt="Place Holder" className="h-13 w-13" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 w-10 bg-gray-200 cursor-pointer rounded-full flex justify-center items-center relative">
          <MessageOutlined className="text-xl text-gray-700!" />
          <div className="flex justify-center items-center w-4 h-4 absolute bottom-1 right-1.5 bg-gray-200 rounded-full z-100">
            <p className="text-sm text-red-400! rounded-full z-100">1</p>
          </div>
        </div>
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <Space>
            {profile.avatar_url ? (
              <img
                src={domainUrl + profile.avatar_url}
                alt="Place Holder"
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10  rounded-full bg-gray-200 flex justify-center items-center">
                <UserOutlined className="text-md text-gray-700!" />
              </div>
            )}

            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
};

export default NavigationBar;
