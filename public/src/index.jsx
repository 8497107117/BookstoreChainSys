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
import App from './components/App';
import { HomeContainer, LoginContainer } from './containers';
//  redux
import store from './store';

render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={HomeContainer} />
        <Route path='/about' render={() => <div>About</div>} />
        <Route path='/auth/login' component={LoginContainer} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('app')
);
