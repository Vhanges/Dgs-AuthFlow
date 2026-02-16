import { Navigate, Outlet, useLocation } from "react-router-dom";

// Only render children if authenticated
export const Auth = ({ store }) => {
  const { userData } = store();
  const location = useLocation();

  // Prevent redirect loop - don't redirect if already on redirect path
  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

// Only render children if NOT authenticated
export const UnAuth = ({ store }) => {
  const { userData } = store();
  const location = useLocation();

  // Prevent redirect loop - don't redirect if already on redirect path
  if (userData) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
