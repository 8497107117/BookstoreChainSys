import { connect } from 'react-redux';
import TopNavbar from '../components/TopNavbar';
import { switchSidebar, logout } from '../actions';

const mapStateToProps = (state) => ({
  storeName: state.getIn(['Authentication', 'bookstore']).Name,
  sidebarButtonClass: `sidebar-button ${state.getIn(['sidebar', 'buttonClass'])}`,
  sidebarVisible: state.getIn(['sidebar', 'sidebarVisible'])
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
  logout() {
    dispatch(logout());
  }
});

const TopNavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavbar);

export default TopNavbarContainer;
