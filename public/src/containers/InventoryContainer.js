import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setFilterInventoryAlert, searchInventory, transferSearchOnChange } from '../actions';
import Inventory from '../components/Inventory';

const searchBooks = (search) => {
  return (book) => {
    return Object.keys(book).reduce((has, key) => {
      if (key === 'Author' || key === 'ISBN' || key === 'Name' || key === 'PublishingName' || key === 'Translator') {
        return book[key] ? has || book[key].includes(search) : has;
      }
      return has;
    }, false);
  };
};

const booksFilter = (books, filters) => {
  let filtedBooks = books;
  filters.forEach((filterValue, filter) => {
    switch (filter) {
      case 'showAlert':
        filtedBooks = filtedBooks.filter(book => !filterValue || book.alert);
        break;
      case 'search':
        filtedBooks = filtedBooks.filter(searchBooks(filterValue));
      default:
        break;
    }
  });
  return filtedBooks;
};

const mapStateToProps = (state) => ({
  books: booksFilter(state.getIn(['inventory', 'books']), state.getIn(['inventory', 'filters'])).toArray(),
  alertFilter: state.getIn(['inventory', 'filters', 'showAlert']),
  searchValue: state.getIn(['inventory', 'filters', 'search'])
});

const mapDispatchToProps = (dispatch) => ({
  setAlertFilter(e, { checked }) {
    e.preventDefault();
    dispatch(setFilterInventoryAlert(checked));
  },
  search(e, { value }) {
    e.preventDefault();
    dispatch(searchInventory(value));
  },
  searchTransfer(ISBN) {
    dispatch(transferSearchOnChange(ISBN));
    dispatch(push({ pathname: '/transfer' }));
  }
});

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inventory);

export default InventoryContainer;
