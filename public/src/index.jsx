//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
//  socket.io
import io from 'socket.io-client';
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
  TransactionContainer,
  TransferContainer
} from './containers';
//  redux
import creatStore from './store';
//  actions
import { verifyAuth, socketConnect } from './actions';
//  eventListener
import eventListener from './eventListener';

const socket = io('http://localhost:3000/');

const history = createHistory();
const store = creatStore(history);

store.dispatch(socketConnect(socket));
store.dispatch(verifyAuth(socket));

eventListener(store);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <PrivateRouteContainer exact path='/' component={InventoryContainer} />
        <PrivateRouteContainer exact path='/transfer' component={TransferContainer} />
        <PrivateRouteContainer exact path='/transaction' component={TransactionContainer} />
        <PrivateRouteContainer exact path='/check' component={MockingContainer} />
        <AuthRouteContainer path='/login' component={LoginContainer} />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
