import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Card, Checkbox, Grid } from 'semantic-ui-react';
import Book from './Book';

const Inventory = ({ books, alertFilter, setAlertFilter, search }) => {
  return (
    <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Checkbox label='Show alert' checked={alertFilter} toggle onChange={setAlertFilter} />
        </Grid.Column>
        <Grid.Column>
          <Input
            icon={<Icon name='search' inverted circular link />}
            placeholder='Search...'
            onChange={search}
          />
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={12}>
          <Card.Group itemsPerRow={5}>
            {!!books && books.map((book) => <Book key={book.id} book={book} />)}
          </Card.Group>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
    </Grid>
  );
};

Inventory.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape()),
  alertFilter: PropTypes.bool.isRequired,
  setAlertFilter: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

Inventory.defaultProps = {
  books: null
};

export default Inventory;
