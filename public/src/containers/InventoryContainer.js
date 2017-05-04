import { connect } from 'react-redux';
import { setFilterInventoryBooks } from '../actions';
import Inventory from '../components/Inventory';

const booksFilter = (books, filters) => {
  let filtedBooks = books;
  filters.forEach((filterValue, filter) => {
    switch (filter) {
      case 'showAlert':
        filtedBooks = books.filter(book => !filterValue || book.alert);
        break;
      default:
        break;
    }
  });
  return filtedBooks;
};

const mapStateToProps = (state) => ({
  books: booksFilter(state.getIn(['inventory', 'books']), state.getIn(['inventory', 'filters'])).toArray(),
  alertFilter: state.getIn(['inventory', 'filters', 'showAlert'])
});

const mapDispatchToProps = (dispatch) => ({
  setAlertFilter(e, { checked }) {
    e.preventDefault();
    dispatch(setFilterInventoryBooks(checked));
  }
});

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inventory);

export default InventoryContainer;
