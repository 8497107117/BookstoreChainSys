import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Card, Checkbox, Grid } from 'semantic-ui-react';
import Book from './Book';

const Inventory = ({ books,
  alertFilter,
  showAll,
  searchValue,
  setAlertFilter,
  setShowAllFilter,
  search,
  searchTransfer
 }) => {
  return (
    <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Checkbox label='Show alert' checked={alertFilter} toggle onChange={setAlertFilter} />
        </Grid.Column>
        <Grid.Column>
          <Checkbox label='Show All' checked={showAll} toggle onChange={setShowAllFilter} />
        </Grid.Column>
        <Grid.Column>
          <Input
            icon={<Icon name='search' inverted circular link />}
            value={searchValue}
            placeholder='Search...'
            onChange={search}
          />
          <Button icon='cancel' value='' circular onClick={search} />
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={12}>
          <Card.Group itemsPerRow={5}>
            {!!books && books.map((book) =>
              <Book
                key={book.id}
                book={book}
                clickEvent={e => {
                  e.preventDefault();
                  searchTransfer(book.ISBN);
                }}
              />)}
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
  showAll: PropTypes.bool.isRequired,
  setAlertFilter: PropTypes.func.isRequired,
  setShowAllFilter: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchTransfer: PropTypes.func.isRequired
};

Inventory.defaultProps = {
  books: null
};

export default Inventory;
