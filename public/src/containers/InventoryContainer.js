import { connect } from 'react-redux';
import Inventory from '../components/Inventory';

const mapStateToProps = (state) => ({
  books: state.getIn(['inventory', 'books']),
});

const mapDispatchToProps = () => ({
});

const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inventory);

export default InventoryContainer;
