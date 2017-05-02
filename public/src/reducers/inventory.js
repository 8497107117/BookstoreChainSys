import Immutable from 'immutable';
import { GET_INVENTORY } from '../actions';

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
});

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY:
      return state.set('books', action.books).set('displayBooks', reviseBookInfo(action.books));
    default:
      return state;
  }
};

export default inventory;
