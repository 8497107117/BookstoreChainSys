import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import InputField from './InputField';

const Login = ({ store, password, pristine, _onChange, _onSubmit }) => {
  return (
    <div id="login">
      <Form
        error={store.status || password.status}
        onSubmit={
          e => {
            e.preventDefault();
            _onSubmit(store.value, password.value);
          }
        }
      >
        <InputField
          id="login-store"
          validationState={store.status}
          errMsg={store.errMsg}
          label="Store"
          type="text"
          placeholder="please enter your storeID"
          onChange={e => _onChange('store', e.target.value)}
        />
        <InputField
          id="login-password"
          validationState={password.status}
          errMsg={password.errMsg}
          label="Password"
          type="password"
          placeholder="please enter your password"
          onChange={e => _onChange('password', e.target.value)}
        />
        <div className="actions">
          <button
            onClick={
              e => {
                e.preventDefault();
                _onSubmit(store.value, password.value);
              }
            }
            className="login-btn"
          >✔  Login</button>
          <button
            onClick={
              e => {
                e.preventDefault();
                pristine();
              }
            }
            className="close-btn"
          >✘  Reset</button>
        </div>
      </Form>
    </div>
  );
};

Login.propTypes = {
  store: PropTypes.shape().isRequired,
  password: PropTypes.shape().isRequired,
  pristine: PropTypes.func.isRequired,
  _onChange: PropTypes.func.isRequired,
  _onSubmit: PropTypes.func.isRequired
};

export default Login;
