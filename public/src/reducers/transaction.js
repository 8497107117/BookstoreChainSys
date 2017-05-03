import Immutable from 'immutable';
import { GET_TRANSACTION } from '../actions';

const initialState = Immutable.fromJS({
  transaction: null,
});

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return state.set('transaction', action.transaction);
    default:
      return state;
  }
};

export default inventory;
