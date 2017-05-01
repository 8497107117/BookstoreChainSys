import { combineReducers } from 'redux-immutable';
import Authentication from './Authentication';
import inventory from './inventory';
import loginForm from './loginForm';
import sidebar from './sidebar';

const reducers = combineReducers({
  Authentication,
  inventory,
  loginForm,
  sidebar
});

export default reducers;
