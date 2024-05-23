// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ element, ...rest }) => {
//   const { isLoggedIn } = useAuth();

//   return isLoggedIn ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/register" replace />
//   );
// };

// export default PrivateRoute;



// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Assuming AuthContext is defined in a separate file

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/register" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ component: Component}) => {

//     // Define a state to track authentication status
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         // Retrieve token from localStorage
//         const token = localStorage.getItem('token');
        
//         // Check if token exists and is not empty
//         setIsAuthenticated(token && token.trim() !== '');

//         // Log authentication state
//         console.log('Authentication state:', isAuthenticated);

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Run this effect only once on component mount

//     return (
//         isAuthenticated ? <Component /> : <Navigate to="/register" />
//     );
// }

// export default PrivateRoute;



import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/register" />}
    />
  );
};

export default PrivateRoute;


