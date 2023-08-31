import React from 'react'
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, allowedRoles, userRole, ...rest }) => {
  console.log("PrivateRoute isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute allowedRoles:", allowedRoles);
  console.log("PrivateRoute userRole:", userRole);
  const navigate = useNavigate(); 
  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return <Route {...rest} element={<Component />} />;
  } else {
    // Use the navigate function to redirect
    navigate('/login');
    // Return null or a placeholder component while redirecting
    return null;
  }
}

  //  Yasmine code  
  // return (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       isAuthenticated && allowedRoles.includes(userRole) ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to="/login" />
  //       )
  //     }


export default PrivateRoute; 