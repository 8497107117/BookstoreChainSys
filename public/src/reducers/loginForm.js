import Immutable from 'immutable';
import { PRISTINE_LOGIN_FORM, LOGIN_ONCHANGE, LOGIN_FAIL } from '../actions';

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
      return state.set(action.field, {
        status: false,
        errMsg: '',
        value: action.value
      });
    case LOGIN_FAIL:
      return state.set(action.field, {
        status: true,
        errMsg: action.errMsg,
        value: state.get(action.field).value
      });
    default:
      return state;
  }
};

export default loginForm;
