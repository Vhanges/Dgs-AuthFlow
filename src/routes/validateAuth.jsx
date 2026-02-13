import { Navigate, Outlet, useLocation } from "react-router-dom";

// Only render children if authenticated
export const Auth = ({ store }) => {
  const { accessToken, userData } = store();
  const location = useLocation();

  // Prevent redirect loop - don't redirect if already on redirect path
  if (!accessToken || !userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

// Only render children if NOT authenticated
export const UnAuth = ({ store }) => {
  const { accessToken, userData } = store();
  const location = useLocation();

  console.log("token: " + accessToken);

  // Prevent redirect loop - don't redirect if already on redirect path
  if (accessToken && userData) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
