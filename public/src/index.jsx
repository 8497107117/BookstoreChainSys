//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//  css
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import '../assets/css/index.scss';
//  components & containers
import PrivateRoute from './components/PrivateRoute';
import { AppContainer, HomeContainer, LoginContainer } from './containers';
//  redux
import store from './store';

render(
  <Provider store={store}>
    <Router>
      <AppContainer>
        <PrivateRoute exact path='/' store={store} component={HomeContainer} />
        <Route path='/login' component={LoginContainer} />
      </AppContainer>
    </Router>
  </Provider>,
  document.getElementById('app')
);
