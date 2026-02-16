import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../../store/useAuth";
import Main from "../../layout/Main";
import Home from "../../pages/Home";
import EditProfile from "../../pages/EditProfile";
import AuthLayout from "../../layout/AuthLayout";
import SignUp from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";
import SetUpNewPassword from "../../pages/SetUpNewPassword";
import Login from "../../pages/Login";

const MainRoutes = () => {
  const { userData } = useAuthStore();
  const isAuthenticated = !!userData;

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          {/* Authenticated routes */}
          <Route element={<Main headerType="header-one" />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<Main headerType="header-two" />}>
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>

          {/* Redirect auth pages to home if already authenticated */}
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
          {/* Unauthenticated routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password/set-up-new-password"
              element={<SetUpNewPassword />}
            />
          </Route>

          {/* Redirect everything else to login if not authenticated */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default MainRoutes;
