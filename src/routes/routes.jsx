import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Main from "../layout/Main";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import AuthLayout from "../layout/AuthLayout";
import SetUpNewPassword from "../pages/SetUpNewPassword";

const routes = [
  { path: "/home", element: <Home />, useMainLayout: true },
  { path: "/login", element: <Login />, useAuthLayout: true },
  { path: "/signup", element: <SignUp />, useAuthLayout: true },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    useAuthLayout: true,
  },
  {
    path: "/forgot-password/set-up-new-password",
    element: <SetUpNewPassword />,
    useAuthLayout: true,
  },
];

export const RouteComponents = routes.map((route, index) => {
  let element = route.element;

  if (route.useMainLayout) {
    element = <Main>{route.element}</Main>;
  } else if (route.useAuthLayout) {
    element = <AuthLayout>{route.element}</AuthLayout>;
  }

  return <Route key={index} path={route.path} element={element} />;
});
