import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TopNavbar from '../components/TopNavbar';
import { switchSidebar, logout, setFilterInventoryAlert, searchInventory } from '../actions';

const mapStateToProps = (state) => ({
  storeName: state.getIn(['Authentication', 'bookstore', 'Name']),
  sidebarButtonClass: `sidebar-button ${state.getIn(['sidebar', 'buttonClass'])}`,
  sidebarVisible: state.getIn(['sidebar', 'sidebarVisible']),
  alertCount: state.getIn(['inventory', 'alertCount']),
  msgCount: state.getIn(['transfer', 'msgCount'])
});

const mapDispatchToProps = (dispatch) => ({
  sidebarClick(status) {
    dispatch(switchSidebar(status));
  },
  fullscreenClick() {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    }
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
    else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  },
  msgClick(e) {
    e.preventDefault();
    dispatch(push({
      pathname: '/transfer'
    }));
  },
  alertClick(e) {
    e.preventDefault();
    dispatch(setFilterInventoryAlert(true));
    dispatch(searchInventory(''));
    dispatch(push({
      pathname: '/'
    }));
  },
  logout() {
    dispatch(logout());
  }
});

const TopNavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavbar);

export default TopNavbarContainer;
