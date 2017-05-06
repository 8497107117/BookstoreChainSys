import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuthRoute from '../components/AuthRoute';

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['Authentication', 'isAuthenticated'])
});

const mapDispatchToProps = () => ({
});

const AuthRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRoute);

export default withRouter(AuthRouteContainer);
