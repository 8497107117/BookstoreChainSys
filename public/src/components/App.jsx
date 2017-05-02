import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import StoreCardContainer from '../containers/StoreCardContainer';
import TopNavbarContainer from '../containers/TopNavbarContainer';

const App = ({
  children,
  isAuthenticated,
  overlayStyle,
  sidebarVisible,
  sidebarClick
 }) => {
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
          <StoreCardContainer />
          <Menu.Item as={Link} to="/" name='Dashboard'>
            <Icon name='home' />
            Dashboard
            </Menu.Item>
          <Menu.Item as={Link} to="/inventory" name='Inventory'>
            <Icon name='book' />
            Inventory
            </Menu.Item>
          <Menu.Item as={Link} to="/chart" name='Chart'>
            <Icon name='bar chart' />
            Chart
            </Menu.Item>
          <Menu.Item as={Link} to="/transfer" name='Transfer'>
            <Icon name='shipping' />
            Transfer
            </Menu.Item>
          <Menu.Item as={Link} to="/mocking" name='Mocking'>
            <Icon name='barcode' />
            Mocking
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <div
            className="overlay"
            onClick={() => { sidebarClick(sidebarVisible); }}
            style={overlayStyle}
          ></div>
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
  sidebarVisible: PropTypes.bool.isRequired,
  sidebarClick: PropTypes.func.isRequired,
};

App.defaultProps = {
  bookstore: null
};

export default App;
