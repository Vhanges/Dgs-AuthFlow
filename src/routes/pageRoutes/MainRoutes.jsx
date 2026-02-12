import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Auth, UnAuth } from "../validateAuth";
import { useAuthStore } from "../../store/useAuth";
import Main from "../../layout/Main";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import EditProfile from "../../pages/EditProfile";

// Layout wrapper for authenticated routes with header-one
const MainLayoutHeaderOne = () => (
  <Main headerType="header-one">
    <Outlet />
  </Main>
);

// Layout wrapper for authenticated routes with header-two
const MainLayoutHeaderTwo = () => (
  <Main headerType="header-two">
    <Outlet />
  </Main>
);

const MainRoutes = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Unauthenticated routes - redirect to /home if already logged in */}
      <Route element={<UnAuth store={useAuthStore} redirect="/home" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Authenticated routes with header-one layout */}
      {/* <Route element={<Auth store={useAuthStore} redirect="/login" />}> */}
        <Route element={<MainLayoutHeaderOne />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Authenticated routes with header-two layout */}
        <Route element={<MainLayoutHeaderTwo />}>
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      {/* </Route> */}
    </Routes>
  );
};

export default MainRoutes;
