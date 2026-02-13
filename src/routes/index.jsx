import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./pageRoutes/MainRoutes";

const Landing = () => {
  return <h1>Landing</h1>;
};

const NotFound = () => {
  return <h1>NotFound</h1>;
};

const RootRoutes = () => {
  const router = createBrowserRouter([{ path: "/*", Component: MainRoutes }]);

  return <RouterProvider router={router} />;
};

export default RootRoutes;
