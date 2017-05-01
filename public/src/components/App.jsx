import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import CardContainer from '../containers/CardContainer';
import TopNavbarContainer from '../containers/TopNavbarContainer';

const App = ({
  children,
  isAuthenticated,
  overlayStyle,
  sidebarVisible }) => {
  if (!isAuthenticated) {
    return (
      <div id="wrapper">
        <div id="content-wrapper">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div id="wrapper">
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='push'
          width='thin'
          visible={sidebarVisible}
          icon='labeled'
          vertical inverted
        >
          <CardContainer />
          <Menu.Item as={Link} to="/" name='dashboard'>
            <Icon name='home' />
            Dashboard
            </Menu.Item>
          <Menu.Item name='gamepad'>
            <Icon name='gamepad' />
            Games
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <div className="overlay" style={overlayStyle}></div>
          <TopNavbarContainer />
          <div id="content-wrapper">
            {children}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  overlayStyle: PropTypes.shape().isRequired,
  sidebarVisible: PropTypes.bool.isRequired
};

App.defaultProps = {
  bookstore: null
};

export default App;
