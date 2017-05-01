import { connect } from 'react-redux';
import Card from '../components/Card';

const mapStateToProps = (state) => ({
  bookstore: state.getIn(['Authentication', 'bookstore'])
});

const mapDispatchToProps = () => ({
});

const CardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);

export default CardContainer;
