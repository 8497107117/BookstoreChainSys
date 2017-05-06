import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import Authentication from './Authentication';
import inventory from './inventory';
import loginForm from './loginForm';
import mockingForm from './mockingForm';
import sidebar from './sidebar';
import transaction from './transaction';
import transfer from './transfer';

const reducers = combineReducers({
  Authentication,
  inventory,
  loginForm,
  mockingForm,
  sidebar,
  transaction,
  transfer,
  router: routerReducer
});

export default reducers;
