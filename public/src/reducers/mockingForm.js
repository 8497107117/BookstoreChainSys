import Immutable from 'immutable';
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
  CLOSE_DIMMER
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
  books: null,
  displayBooks: null,
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
      return state.set('books', action.books).set('displayBooks', reviseBookInfo(action.books));
    case SELL_BOOK_ONCHANGE:
      return state.set('sellBook', {
        value: action.value,
        count: state.get('sellBook').count
      });
    case SELL_COUNT_ONCHANGE:
      return state.set('sellBook', {
        value: state.get('sellBook').value,
        count: parseInt(action.value, 10)
      });
    case PURCHASE_BOOK_ONCHANGE:
      return state.set('purchaseBook', {
        value: action.value,
        count: state.get('purchaseBook').count
      });
    case PURCHASE_COUNT_ONCHANGE:
      return state.set('purchaseBook', {
        value: state.get('purchaseBook').value,
        count: parseInt(action.value, 10)
      });
    case RETURN_BOOK_ONCHANGE:
      return state.set('returnBook', {
        value: action.value,
        count: state.get('returnBook').count
      });
    case RETURN_COUNT_ONCHANGE:
      return state.set('returnBook', {
        value: state.get('returnBook').value,
        count: parseInt(action.value, 10)
      });
    case REMOVE_BOOK_ONCHANGE:
      return state.set('removeBook', { value: action.value });
    case MOCK_DONE:
      return state.set('msg', action.msg).set('dimmerOpen', true);
    case CLOSE_DIMMER:
      return state.set('msg', '').set('dimmerOpen', false);
    default:
      return state;
  }
};

export default loginForm;
