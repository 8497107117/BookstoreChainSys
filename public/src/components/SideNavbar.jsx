import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const SideNavbar = ({ bookstore }) => {
  return (
    <Navbar inverse collapseOnSelect fixedTop id="sidebar-wrapper" role="navigation">
      <NavItem>{bookstore.Name}</NavItem>
      <Nav bsClass={'nav sidebar-nav'}>
        <LinkContainer exact to="/"><NavItem>Home</NavItem></LinkContainer>
      </Nav>
    </Navbar>
  );
};

SideNavbar.propTypes = {
  bookstore: PropTypes.shape().isRequired,
};

export default SideNavbar;
