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

import AddClient from "../pages/AddClient";
import Invoice from "../pages/Invoice";
import PendingTasks from "../pages/PendingTasks";
import Calendar from "../pages/Calendar";
import CompletedTasks from "../pages/CompletedTasks";
import Clients from "../pages/Clients";
import Tasks from "../pages/Tasks";
import Dashboard from "../pages/Dashboard/Dashboard";

const authProtectedRoutes = [
  { path: "/users", component: <Users /> },
  { path: "/roles", component: <Mapping /> },
  { path: "/add-client", component: <AddClient /> },
  { path: "/clients", component: <Clients /> },
  { path: "/tasks", component: <Tasks /> },
  { path: "/invoice", component: <Invoice /> },
  { path: "/pending-tasks", component: <PendingTasks /> },
  { path: "/completed-tasks", component: <CompletedTasks /> },
  { path: "/calendar", component: <Calendar /> },
  { path: "/dashboard", component: <Dashboard /> },

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
