import Immutable, { fromJS, List } from 'immutable';
import { GET_INVENTORY, SET_FILTER_INVENTORY_BOOKS } from '../actions';

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
    revisedBooks.push(Object.assign({}, book, { alert: book.Count < 5 }));
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
    showAlert: false
  },
  alertCount: 0
});

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY:
      const books = monitorAlert(action.books);
      return state.set('books', List(books.books)).set('alertCount', books.alertCount)
        .set('displayBooks', List(reviseBookInfo(books.books)));
    case SET_FILTER_INVENTORY_BOOKS:
      return state.set('filters', fromJS({
        showAlert: action.filterValue
      }));
    default:
      return state;
  }
};

export default inventory;
