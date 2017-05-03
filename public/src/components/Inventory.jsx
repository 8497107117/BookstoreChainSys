import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from 'semantic-ui-react';
import Book from './Book';

const Inventory = ({ books }) => {
  return (
    <Grid columns='equal'>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column width={12}>
        <Card.Group itemsPerRow={5}>
          {!!books && books.map((book) => <Book key={book.id} book={book} />)}
        </Card.Group>
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

Inventory.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape()),
};

Inventory.defaultProps = {
  books: null
};

export default Inventory;
