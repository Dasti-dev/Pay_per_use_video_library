import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Dashboard />;
        } else {
          navigate('/login', { state: { from: props.location } });
          return null; // Render nothing if not authenticated
        }
      }}
    />
  );
};

export default PrivateRoute;
