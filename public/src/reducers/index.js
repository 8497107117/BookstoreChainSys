import { combineReducers } from 'redux-immutable';
import Authentication from './Authentication';
import loginForm from './loginForm';

const reducers = combineReducers({
  Authentication,
  loginForm
});

export default reducers;
