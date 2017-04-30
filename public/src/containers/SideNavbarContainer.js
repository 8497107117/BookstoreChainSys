import { connect } from 'react-redux';
import SideNavbar from '../components/SideNavbar';

const mapStateToProps = (state) => ({
  bookstore: state.getIn(['Authentication', 'bookstore'])
});

const mapDispatchToProps = () => ({
});

const SideNavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideNavbar);

export default SideNavbarContainer;
