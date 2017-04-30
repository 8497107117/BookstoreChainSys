import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !isAuthenticated ?
        (<Component {...props} />) :
        (<Redirect
          to={{
            pathname: '/'
          }}
        />)
    )}
  />
);

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default AuthRoute;
