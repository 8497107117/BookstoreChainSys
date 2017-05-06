import Immutable, { List } from 'immutable';
import { GET_TRANSACTION, LOGOUT } from '../actions';

const initialState = Immutable.fromJS({
  transaction: [],
});

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return state.set('transaction', List(action.transaction));
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default inventory;
