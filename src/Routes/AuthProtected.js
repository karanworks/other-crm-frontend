import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";
import { getLoggedinUser } from "../helpers/api_helper";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../slices/auth/login/thunk";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();

  const loggedInUser = getLoggedinUser();

  const allAllowedRoutes = loggedInUser?.data.menus
    .map((menu) => {
      return menu?.subItems.map((submenu) => {
        return submenu;
      });
    })
    .flat();

  const allowedRoutesPaths = allAllowedRoutes?.map((route) => {
    return route.link;
  });

  const currentPath = location.pathname;

  if (!allowedRoutesPaths.includes(currentPath)) {
    return (
      <Navigate
        to={{ pathname: "/dashboard", state: { from: props.location } }}
      />
    );
  }

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
