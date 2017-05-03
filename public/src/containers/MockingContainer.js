import { connect } from 'react-redux';
import Mocking from '../components/Mocking';
import {
  sellBook,
  sellBookOnChange,
  sellCountOnChange,
  purchaseBookOnChange,
  purchaseCountOnChange,
  returnBookOnChange,
  returnCountOnChange,
  removeBookOnChange,
  withPublishing,
  closeModal
} from '../actions';

const mapStateToProps = (state) => ({
  displayBooks: state.getIn(['mockingForm', 'displayBooks']),
  displayInventoryBooks: state.getIn(['inventory', 'displayBooks']),
  sellBookData: state.getIn(['mockingForm', 'sellBook']),
  purchaseBookData: state.getIn(['mockingForm', 'purchaseBook']),
  returnBookData: state.getIn(['mockingForm', 'returnBook']),
  removeBookData: state.getIn(['mockingForm', 'removeBook']),
  msg: state.getIn(['mockingForm', 'msg']),
  modalOpen: state.getIn(['mockingForm', 'modalOpen'])
});

const mapDispatchToProps = (dispatch) => ({
  sellBook(data) {
    dispatch(sellBook(data));
  },
  sellBookOnChange(e, { value }) {
    dispatch(sellBookOnChange(value));
  },
  sellCountOnChange(value) {
    dispatch(sellCountOnChange(value));
  },
  purchaseBook(data) {
    dispatch(withPublishing(data, 'purchase'));
  },
  purchaseBookOnChange(e, { value }) {
    dispatch(purchaseBookOnChange(value));
  },
  purchaseCountOnChange(value) {
    dispatch(purchaseCountOnChange(value));
  },
  returnBook(data) {
    dispatch(withPublishing(data, 'return'));
  },
  returnBookOnChange(e, { value }) {
    dispatch(returnBookOnChange(value));
  },
  returnCountOnChange(value) {
    dispatch(returnCountOnChange(value));
  },
  removeBook(data) {
    dispatch(withPublishing(data, 'remove'));
  },
  removeBookOnChange(e, { value }) {
    dispatch(removeBookOnChange(value));
  },
  closeModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }
});

const MockingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mocking);

export default MockingContainer;
