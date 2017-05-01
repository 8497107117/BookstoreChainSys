import { connect } from 'react-redux';
import StoreCard from '../components/StoreCard';

const mapStateToProps = (state) => ({
  bookstore: state.getIn(['Authentication', 'bookstore'])
});

const mapDispatchToProps = () => ({
});

const StoreCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreCard);

export default StoreCardContainer;
