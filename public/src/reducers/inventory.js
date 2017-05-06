import Immutable, { List } from 'immutable';
import { GET_INVENTORY, SET_FILTER_INVENTORY_ALERT, INVENTORY_SEARCH_ONCHANGE, LOGOUT } from '../actions';

const reviseBookInfo = (books) => {
  let revisedBooks = [];
  books.forEach((book) => {
    revisedBooks.push({
      value: book.id,
      text: book.Name
    });
  });
  return revisedBooks;
};

const monitorAlert = (books) => {
  let revisedBooks = [];
  let alertCount = 0;
  books.forEach((book) => {
    if (book.Count < 5) {
      alertCount += 1;
    }
    revisedBooks.push({ ...book, alert: book.Count < 5 });
  });
  return {
    books: revisedBooks,
    alertCount
  };
};

const initialState = Immutable.fromJS({
  books: [],
  displayBooks: [],
  filters: {
    showAlert: false,
    search: ''
  },
  alertCount: 0
});

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY:
      const books = monitorAlert(action.books);
      return state.set('books', List(books.books)).set('alertCount', books.alertCount)
        .set('displayBooks', List(reviseBookInfo(books.books)));
    case SET_FILTER_INVENTORY_ALERT:
      return state.setIn(['filters', 'showAlert'], action.filterValue);
    case INVENTORY_SEARCH_ONCHANGE:
      return state.setIn(['filters', 'search'], action.searchValue);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default inventory;
