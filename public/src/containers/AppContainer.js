import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from '../components/App';

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['Authentication', 'isAuthenticated']),
  overlayStyle: { display: state.getIn(['sidebar', 'overlayDisplay']) },
  sidebarVisible: state.getIn(['sidebar', 'sidebarVisible']),
  bookstore: state.getIn(['Authentication', 'bookstore'])
});

const mapDispatchToProps = () => ({
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);
