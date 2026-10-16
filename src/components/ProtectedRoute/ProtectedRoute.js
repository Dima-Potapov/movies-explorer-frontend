import React from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import { Route } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, children, redirectPath = '/'}) {
  return (
    <Route exact>
      {isLoggedIn ? children : <Redirect to={redirectPath}/>}
    </Route>
  );
}

export default ProtectedRoute;
