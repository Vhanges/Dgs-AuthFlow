import { Navigate, Outlet, useLocation } from "react-router-dom";

// Only render children if authenticated
export const Auth = ({ store, redirect }) => {
  const { token, userData } = store();
  const location = useLocation();

  return token && userData ? (
    <Outlet />
  ) : (
    <Navigate to={redirect} state={{ from: location }} replace />
  );
};

// Only render children if NOT authenticated
export const UnAuth = ({ store, redirect }) => {
  const { token, userData } = store();
  const location = useLocation();

  return token && userData ? (
    <Navigate to={redirect} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
