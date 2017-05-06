import Immutable, { fromJS } from 'immutable';
import { PRISTINE_LOGIN_FORM, LOGIN_ONCHANGE, LOGIN_FAIL, LOGOUT } from '../actions';

const initialState = Immutable.fromJS({
  store: {
    status: false,
    errMsg: '',
    value: ''
  },
  password: {
    status: false,
    errMsg: '',
    value: ''
  }
});

const loginForm = (state = initialState, action) => {
  switch (action.type) {
    case PRISTINE_LOGIN_FORM:
      return initialState;
    case LOGIN_ONCHANGE:
      return state.set(action.field, fromJS({
        status: false,
        errMsg: '',
        value: action.value
      }));
    case LOGIN_FAIL:
      return state.set(action.field, fromJS({
        status: true,
        errMsg: action.errMsg,
        value: state.getIn([action.field, 'value'])
      }));
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginForm;
