import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest}) => {
  const isAdmin = useSelector((state) => state.user.current.role) === "ADMIN";

  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        if (isAdmin) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {from: props.location},
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
