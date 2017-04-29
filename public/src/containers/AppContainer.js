import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from '../components/App';
import { switchSidebar } from '../actions';

const mapStateToProps = (state) => ({
  overlayStyle: { display: state.getIn(['sidebar', 'overlayDisplay']) },
  sidebarButtonClass: `sidebar-button ${state.getIn(['sidebar', 'buttonClass'])}`
});

const mapDispatchToProps = (dispatch) => ({
  sidebarClick() {
    const status = document.querySelector('.overlay').style.display;
    dispatch(switchSidebar(status));
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);
