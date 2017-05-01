import { connect } from 'react-redux';
import Inventory from '../components/Inventory';
import { requestInventory } from '../actions';

const mapStateToProps = (state) => ({
  books: state.getIn(['inventory', 'books']),
  needReq: state.getIn(['inventory', 'needReq'])
});

const mapDispatchToProps = (dispatch) => ({
  req() {
    dispatch(requestInventory());
  }
});

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inventory);

export default InventoryContainer;
