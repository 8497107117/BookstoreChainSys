import { connect } from 'react-redux';
import TopNavbar from '../components/TopNavbar';
import { switchSidebar } from '../actions';

const mapStateToProps = (state) => ({
  storeName: state.getIn(['Authentication', 'bookstore']).Name,
  sidebarButtonClass: `sidebar-button ${state.getIn(['sidebar', 'buttonClass'])}`,
  sidebarVisible: state.getIn(['sidebar', 'sidebarVisible'])
});

const mapDispatchToProps = (dispatch) => ({
  sidebarClick(status) {
    dispatch(switchSidebar(status));
  }
});

const TopNavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavbar);

export default TopNavbarContainer;
