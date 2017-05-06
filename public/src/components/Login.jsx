import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid } from 'semantic-ui-react';
import InputField from './InputField';

const Login = ({ store, password, pristine, _onChange, _onSubmit }) => {
  return (
    <Grid columns='equal'>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column width={8}>
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
            <Button
              content='✔  Login'
              positive
              onClick={
                e => {
                  e.preventDefault();
                  _onSubmit(store.value, password.value);
                }
              }
            />
            <Button
              content='✘  Reset'
              onClick={
                e => {
                  e.preventDefault();
                  pristine();
                }
              }
            />
          </div>
        </Form>
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>
    </Grid>
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
