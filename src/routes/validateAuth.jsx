import { Navigate, Outlet, useLocation } from "react-router-dom";

// Only render children if authenticated
export const Auth = ({ store, redirect }) => {
  const { accessToken, userData } = store();
  const location = useLocation();

  return accessToken && userData ? (
    <Outlet />
  ) : (
    <Navigate to={redirect} state={{ from: location }} replace />
  );
};

// Only render children if NOT authenticated
export const UnAuth = ({ store, redirect }) => {
  const { accessToken, userData } = store();
  const location = useLocation();

  return accessToken && userData ? (
    <Navigate to={redirect} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
