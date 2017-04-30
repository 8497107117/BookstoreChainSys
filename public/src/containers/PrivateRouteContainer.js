import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['Authentication', 'isAuthenticated'])
});

const mapDispatchToProps = () => ({
});

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);

export default withRouter(PrivateRouteContainer);
