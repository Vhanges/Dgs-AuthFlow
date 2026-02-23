import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../../store/useAuth";
import Main from "../../layout/Main";
import Home from "../../pages/User/Home";
import EditProfile from "../../pages/User/EditProfile";
import AuthLayout from "../../layout/AuthLayout";
import SignUp from "../../pages/User/SignUp";
import ForgotPassword from "../../pages/User/ForgotPassword";
import SetUpNewPassword from "../../pages/User/SetUpNewPassword";
import Login from "../../pages/User/Login";
import LoggingRedirect from "../../pages/User/LoggingRedirect";
import MainLayout from "../../layout/MainLayout";
import AccountOption from "../../pages/User/AccountOption";
import TermsAndCondition from "../../pages/TermsAndCondition";
import Chat from "../../pages/User/Chat";

const MainRoutes = () => {
  const userData = useAuthStore((state) => state.userData);
  3;
  const isAuthenticated = !!userData;

  return (
    <Routes>
      <Route path="/terms-and-condition" element={<TermsAndCondition />} />
      {isAuthenticated ? (
        <>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route
              path="/setting/edit-profile"
              element={<EditProfile />}
            ></Route>
            <Route
              path="/setting/account-option"
              element={<AccountOption />}
            ></Route>
            <Route
              path="/chat"
              element={<Chat />}
            ></Route>
          </Route>

          <Route path="/login" element={<Navigate to="/home" replace />} />
          <Route path="/signup" element={<Navigate to="/home" replace />} />
          <Route
            path="/forgot-password"
            element={<Navigate to="/home" replace />}
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </>
      ) : (
        <>
          <Route element={<AuthLayout />}>
            <Route path="/logging-redirect" element={<LoggingRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password/set-up-new-password"
              element={<SetUpNewPassword />}
            />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default MainRoutes;
