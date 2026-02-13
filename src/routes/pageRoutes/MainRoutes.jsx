import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../validateAuth";
import { useAuthStore } from "../../store/useAuth";
import Main from "../../layout/Main";
import Home from "../../pages/Home";
import EditProfile from "../../pages/EditProfile";
import AuthRoutes from "./AuthRoutes";

const MainRoutes = () => {
  return (
    <Routes>
      {/* Unauthenticated routes */}
      {AuthRoutes()}

      {/* Authenticated routes */}
      <Route element={<Auth store={useAuthStore} redirect="/login" />}>
        <Route element={<Main headerType="header-one" />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<Main headerType="header-two" />}>
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default MainRoutes;
