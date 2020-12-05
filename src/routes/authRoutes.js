import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn, getUserData } from "../config/auth";

export const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const accessPortal = getUserData() && getUserData().accessPortal;
      if (isLoggedIn() && accessPortal) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location },
            }}
          />
        );
      }
    }}
  />
);

export const CustomerRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // const accessPortal = getUserData() && getUserData().accessPortal;
      if (isLoggedIn()) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location },
            }}
          />
        );
      }
    }}
  />
);
