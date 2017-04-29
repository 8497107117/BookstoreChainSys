import React from 'react';
import PropTypes from 'prop-types';
import SideNavbar from './SideNavbar';

const App = ({ children, overlayStyle, sidebarButtonClass, sidebarClick }) => (
  <div id="wrapper">
    <div className="overlay" style={overlayStyle}></div>
    <SideNavbar />
    <button
      type="button"
      className={sidebarButtonClass}
      data-toggle="offcanvas"
      onClick={sidebarClick}
    >
      <span className="button-top"></span>
      <span className="button-middle"></span>
      <span className="button-bottom"></span>
    </button>
    <div id="content-wrapper">
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  overlayStyle: PropTypes.shape().isRequired,
  sidebarButtonClass: PropTypes.string.isRequired,
  sidebarClick: PropTypes.func.isRequired
};

export default App;
