import Immutable, { fromJS } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT } from '../actions';

const initialState = Immutable.fromJS({
  isAuthenticated: false,
  bookstore: {}
});

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('bookstore', fromJS(action.store)).set('isAuthenticated', true);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default Authentication;
