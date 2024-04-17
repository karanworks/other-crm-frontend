import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Users from "../pages/Users";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

//APi Key
import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import CRMConfiguration from "../pages/CRMConfiguration";
import Mapping from "../pages/Mapping";
import CRM from "../pages/CRM";
import Disposition from "../pages/Disposition";
import UserStatus from "../pages/UserStatus";

const authProtectedRoutes = [
  { path: "/home", component: <Home /> },
  { path: "/users", component: <Users /> },
  { path: "/campaign", component: <Campaign /> },
  { path: "/crm-configuration", component: <CRMConfiguration /> },
  { path: "/mapping", component: <Mapping /> },
  { path: "/crm", component: <CRM /> },
  { path: "/disposition", component: <Disposition /> },
  { path: "/user-status", component: <UserStatus /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
