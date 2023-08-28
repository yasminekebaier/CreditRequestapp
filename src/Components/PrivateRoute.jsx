import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, allowedRoles, userRole, ...rest }) => {
  console.log("PrivateRoute isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute allowedRoles:", allowedRoles);
  console.log("PrivateRoute userRole:", userRole);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute