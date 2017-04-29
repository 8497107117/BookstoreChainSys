import { combineReducers } from 'redux-immutable';
import Authentication from './Authentication';
import loginForm from './loginForm';
import sidebar from './sidebar';

const reducers = combineReducers({
  Authentication,
  loginForm,
  sidebar
});

export default reducers;
