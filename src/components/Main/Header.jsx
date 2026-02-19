import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuth";
import { useLogout } from "../../services/useAuth";
import iconLogo from "../../assets/iconLogo.png";
import {
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const domainUrl = import.meta.env.VITE_API_BASE_URL_NO_VERSION;
const placeHolder = "https://via.assets.so/img.jpg?w=600&h=600&bg=e5e7eb&f=png";
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

const Header = () => {
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
      <div className="flex flex-col gap-3">
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <Space>
            <img
              src={
                profile.avatar_url
                  ? domainUrl + profile.avatar_url
                  : placeHolder
              }
              alt="Place Holder"
              className="h-12 w-12 rounded-full"
            />
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
