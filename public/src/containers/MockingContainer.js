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
  closeDimmer
} from '../actions';

const mapStateToProps = (state) => ({
  displayBooks: state.getIn(['mockingForm', 'displayBooks']).toArray(),
  displayInventoryBooks: state.getIn(['inventory', 'displayBooks']).toArray(),
  sellBookData: state.getIn(['mockingForm', 'sellBook']).toObject(),
  purchaseBookData: state.getIn(['mockingForm', 'purchaseBook']).toObject(),
  returnBookData: state.getIn(['mockingForm', 'returnBook']).toObject(),
  removeBookData: state.getIn(['mockingForm', 'removeBook']).toObject(),
  msg: state.getIn(['mockingForm', 'msg']),
  dimmerOpen: state.getIn(['mockingForm', 'dimmerOpen'])
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
  closeDimmer(e) {
    e.preventDefault();
    dispatch(closeDimmer());
  }
});

const MockingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mocking);

export default MockingContainer;
