import Immutable from 'immutable';
import { GET_INVENTORY } from '../actions';

const initialState = Immutable.fromJS({
  books: null,
  needReq: true
});

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY:
      return state.set('books', action.books).set('needReq', false);
    default:
      return state;
  }
};

export default inventory;
