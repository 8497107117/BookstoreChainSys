import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ store, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      store.getState('Authentication').get('isAuthenticated') ?
        (<Component {...props} />) :
        (<Redirect
          to={{
            pathname: '/login'
          }}
        />)
    )}
  />
);

PrivateRoute.propTypes = {
  store: PropTypes.shape().isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
