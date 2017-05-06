import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  transferSearchOnChange,
  transferRegionOnChange,
  transferCountOnChange,
  sendRequest,
  removeRequest,
  sendResponse,
  setFilterInventoryAlert,
  searchInventory,
  requestInventoryChain
} from '../actions';
import Transfer from '../components/Transfer';

const mapStateToProps = (state) => ({
  searchBookValue: state.getIn(['transfer', 'search', 'book']),
  searchRegionValue: state.getIn(['transfer', 'search', 'region']),
  searchResult: state.getIn(['transfer', 'searchResult']).toArray(),
  requestCount: state.getIn(['transfer', 'requestCount']),
  displayRegion: state.getIn(['transfer', 'displayRegion']).toArray(),
  waitResponse: state.getIn(['transfer', 'waitResponse']).toArray(),
  toRespond: state.getIn(['transfer', 'toRespond']).toArray()
});

const mapDispatchToProps = (dispatch) => ({
  searchBook(searchValue) {
    dispatch(requestInventoryChain(searchValue));
  },
  transferSearchOnChange(e, { value }) {
    e.preventDefault();
    dispatch(transferSearchOnChange(value));
  },
  transferRegionOnChange(e, { value }) {
    e.preventDefault();
    dispatch(transferRegionOnChange(value));
  },
  transferCountOnChange(e, { value }) {
    e.preventDefault();
    dispatch(transferCountOnChange(value));
  },
  sendRequest(req, reqCount) {
    dispatch(sendRequest({ ...req, reqCount }));
  },
  removeRequest(req) {
    dispatch(removeRequest(req));
  },
  sendResponse(res) {
    dispatch(sendResponse(res));
  },
  searchInventory(ISBN) {
    dispatch(setFilterInventoryAlert(false));
    dispatch(searchInventory(ISBN));
    dispatch(push({ pathname: '/' }));
  }
});

const TransferContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transfer);

export default TransferContainer;
