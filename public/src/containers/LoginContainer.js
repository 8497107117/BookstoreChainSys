import { connect } from 'react-redux';
import Login from '../components/Login';
import { pristineLoginForm, loginOnChange, login } from '../actions';

const mapStateToProps = (state) => ({
  store: state.getIn(['loginForm', 'store']).toObject(),
  password: state.getIn(['loginForm', 'password']).toObject()
});

const mapDispatchToProps = (dispatch) => ({
  pristine() {
    dispatch(pristineLoginForm());
  },
  _onChange(field, value) {
    dispatch(loginOnChange(field, value));
  },
  _onSubmit(store, password) {
    dispatch(login({ store, password }));
  }
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
