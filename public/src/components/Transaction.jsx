import React from 'react';
import { Table, Grid, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Transaction = ({ transaction }) => (
  <Grid columns='equal'>
    <Grid.Column>
    </Grid.Column>
    <Grid.Column width={14}>
      <Label as='a' color='blue' size='massive' ribbon>Transaction</Label>
      <Table color='blue' celled selectable padded>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Count</Table.HeaderCell>
            <Table.HeaderCell>Time(UTC)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!!transaction && transaction.map((t) =>
            <Table.Row key={t.id} textAlign='center'>
              <Table.Cell collapsing>{t.Name}</Table.Cell>
              <Table.Cell collapsing>{t.ISBN}</Table.Cell>
              <Table.Cell collapsing>{t.Price}</Table.Cell>
              <Table.Cell collapsing>{t.Count}</Table.Cell>
              <Table.Cell collapsing>{t.Time}</Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </Grid.Column>
    <Grid.Column>
    </Grid.Column>
  </Grid>
);

Transaction.propTypes = {
  transaction: PropTypes.arrayOf(PropTypes.shape()),
};

Transaction.defaultProps = {
  transaction: null
};

export default Transaction;
