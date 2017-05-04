//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
//  css
import 'normalize.css/normalize.css';
import '../assets/css/index.scss';
//  components & containers
import {
  AppContainer,
  AuthRouteContainer,
  InventoryContainer,
  LoginContainer,
  MockingContainer,
  PrivateRouteContainer,
  TransactionContainer
} from './containers';
//  redux
import creatStore from './store';
//  actions
import { verifyAuth } from './actions';

const history = createHistory();
const store = creatStore(history);

store.dispatch(verifyAuth());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <PrivateRouteContainer exact path='/' component={InventoryContainer} />
        <PrivateRouteContainer exact path='/transaction' component={TransactionContainer} />
        <PrivateRouteContainer exact path='/mocking' component={MockingContainer} />
        <AuthRouteContainer path='/login' component={LoginContainer} />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
