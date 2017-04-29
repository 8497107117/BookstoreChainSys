import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const SideNavbar = () => {
  return (
    <Navbar inverse collapseOnSelect fixedTop id="sidebar-wrapper" role="navigation">
      <Nav bsClass={'nav sidebar-nav'}>
        <LinkContainer exact to="/"><NavItem>Home</NavItem></LinkContainer>
        <LinkContainer exact to="/login"><NavItem>Login</NavItem></LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default SideNavbar;
