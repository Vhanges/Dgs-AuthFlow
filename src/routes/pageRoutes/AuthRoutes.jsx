import { Route } from "react-router-dom";
import { UnAuth } from "../validateAuth";
import { useAuthStore } from "../../store/useAuth";
import AuthLayout from "../../layout/AuthLayout";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";
import SetUpNewPassword from "../../pages/SetUpNewPassword";

const AuthRoutes = () => (
  <>
    <Route element={<UnAuth store={useAuthStore} redirect="/home" />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password/set-up-new-password"
          element={<SetUpNewPassword />}
        />
      </Route>
    </Route>
  </>
);

export default AuthRoutes;
