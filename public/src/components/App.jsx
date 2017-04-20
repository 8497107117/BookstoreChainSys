import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const App = (props) => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
