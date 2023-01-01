import { createBrowserRouter, redirect } from "react-router-dom";
import React, { lazy } from "react";
import Login from "~/features/auth/pages";
import Start from "~/features/answersheet/page";
import authLoader from "~/loader";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: React.createElement(Login),
  },
  {
    path: "/answersheet/start/test/:id",
    element: React.createElement(Start),
    loader: authLoader,
  },
]);

export default routes;
