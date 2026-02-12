import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./pageRoutes/MainRoutes";

const RootRoutes = () => {
  const router = createBrowserRouter([
    { path: "/*", Component: MainRoutes },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRoutes;
