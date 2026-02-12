import { Route } from "react-router-dom";
import { UnAuth } from "../validateAuth";
import { useAuthStore } from "../../store/useAuth";
import AuthLayout from "../../layout/AuthLayout";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

const AuthRoutes = () => (
  <>
    <Route element={<UnAuth store={useAuthStore} redirect="/home" />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Route>
  </>
);

export default AuthRoutes;
