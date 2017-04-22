import Immutable from 'immutable';
import { PRISTINE_LOGIN_FORM, LOGIN_ONCHANGE, LOGIN_FAIL } from '../actions';

const initialState = Immutable.fromJS({
  store: {
    status: null,
    errMsg: '',
    value: ''
  },
  password: {
    status: null,
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
        status: null,
        errMsg: '',
        value: action.value
      });
    case LOGIN_FAIL:
      return state.set(action.field, {
        status: 'error',
        errMsg: action.errMsg
      });
    default:
      return state;
  }
};

export default loginForm;
