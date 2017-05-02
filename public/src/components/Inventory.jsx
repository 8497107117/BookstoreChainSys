import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Book from './Book';

const Inventory = ({ books }) => {
  return (
    <Card.Group itemsPerRow={5}>
      {!!books && books.map((book) => <Book key={book.id} book={book} />)}
    </Card.Group>
  );
};

Inventory.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape()),
};

Inventory.defaultProps = {
  books: null
};

export default Inventory;
