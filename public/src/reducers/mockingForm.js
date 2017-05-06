import Immutable, { List } from 'immutable';
import {
  GET_BOOKS,
  SELL_BOOK_ONCHANGE,
  SELL_COUNT_ONCHANGE,
  PURCHASE_BOOK_ONCHANGE,
  PURCHASE_COUNT_ONCHANGE,
  RETURN_BOOK_ONCHANGE,
  RETURN_COUNT_ONCHANGE,
  REMOVE_BOOK_ONCHANGE,
  MOCK_DONE,
  CLOSE_DIMMER,
  LOGOUT
} from '../actions';

const reviseBookInfo = (books) => {
  let revisedBooks = [];
  books.forEach((book) => {
    let revisedBook = {};
    revisedBook.value = book.id;
    revisedBook.text = book.Name;
    revisedBooks.push(revisedBook);
  });
  return revisedBooks;
};

const initialState = Immutable.fromJS({
  books: [],
  displayBooks: [],
  sellBook: {
    value: null,
    count: null
  },
  purchaseBook: {
    value: null,
    count: null
  },
  returnBook: {
    value: null,
    count: null
  },
  removeBook: {
    value: null
  },
  msg: '',
  dimmerOpen: false
});

const loginForm = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return state.set('books', List(action.books)).set('displayBooks', List(reviseBookInfo(action.books)));
    case SELL_BOOK_ONCHANGE:
      return state.setIn(['sellBook', 'value'], action.value);
    case SELL_COUNT_ONCHANGE:
      return state.setIn(['sellBook', 'count'], parseInt(action.value, 10));
    case PURCHASE_BOOK_ONCHANGE:
      return state.setIn(['purchaseBook', 'value'], action.value);
    case PURCHASE_COUNT_ONCHANGE:
      return state.setIn(['purchaseBook', 'count'], parseInt(action.value, 10));
    case RETURN_BOOK_ONCHANGE:
      return state.setIn(['returnBook', 'value'], action.value);
    case RETURN_COUNT_ONCHANGE:
      return state.setIn(['returnBook', 'count'], parseInt(action.value, 10));
    case REMOVE_BOOK_ONCHANGE:
      return state.setIn(['removeBook', 'value'], action.value);
    case MOCK_DONE:
      return state.set('msg', action.msg).set('dimmerOpen', true);
    case CLOSE_DIMMER:
      return state.set('msg', '').set('dimmerOpen', false);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginForm;
