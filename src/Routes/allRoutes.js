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
import Mapping from "../pages/Mapping";

import AddLead from "../pages/AddLead";
import Invoice from "../pages/Invoice";
import Report from "../pages/Report";
import PendingTasks from "../pages/PendingTasks";
import Calendar from "../pages/Calendar";

const authProtectedRoutes = [
  { path: "/users", component: <Users /> },
  { path: "/roles", component: <Mapping /> },
  { path: "/add-lead", component: <AddLead /> },
  { path: "/report", component: <Report /> },
  { path: "/invoice", component: <Invoice /> },
  { path: "/pending-tasks", component: <PendingTasks /> },
  { path: "/calendar", component: <Calendar /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/users" />,
  },
  { path: "*", component: <Navigate to="/users" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
