import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

const TopNavbar = ({
  storeName,
  sidebarButtonClass,
  sidebarVisible,
  sidebarClick,
  fullscreenClick,
  logout
    }) => {
  return (
    <Menu pointing secondary>
      <Menu.Item>
        <button
          type="button"
          className={sidebarButtonClass}
          data-toggle="offcanvas"
          onClick={() => { sidebarClick(sidebarVisible); }}
        >
          <span className="button-top"></span>
          <span className="button-middle"></span>
          <span className="button-bottom"></span>
        </button>
      </Menu.Item>
      <Menu.Item header position='right'>{storeName} bookstore</Menu.Item>
      <Menu.Item name='fullscreen'>
        <Button icon='window maximize' onClick={fullscreenClick} />
      </Menu.Item>
      <Menu.Item name='transfer'>
        <Button icon='envelope' />
      </Menu.Item>
      <Menu.Item name='alert'>
        <Button icon='bell outline' />
      </Menu.Item>
      <Menu.Item name='logout' onClick={logout}>
        <Button icon='shutdown' />
      </Menu.Item>
    </Menu>
  );
};

TopNavbar.propTypes = {
  storeName: PropTypes.string.isRequired,
  sidebarButtonClass: PropTypes.string.isRequired,
  sidebarVisible: PropTypes.bool.isRequired,
  sidebarClick: PropTypes.func.isRequired,
  fullscreenClick: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default TopNavbar;
