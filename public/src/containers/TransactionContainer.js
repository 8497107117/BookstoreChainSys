import { connect } from 'react-redux';
import Transaction from '../components/Transaction';

const mapStateToProps = (state) => ({
  transaction: state.getIn(['transaction', 'transaction']).toArray()
});

const mapDispatchToProps = () => ({
});

const TransactionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transaction);

export default TransactionContainer;
