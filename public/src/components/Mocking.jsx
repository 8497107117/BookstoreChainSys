import React from 'react';
import { Modal, Grid, Label, Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Mocking = ({
  displayBooks,
  displayInventoryBooks,
  sellBookData,
  purchaseBookData,
  returnBookData,
  removeBookData,
  msg,
  modalOpen,
  sellBook,
  sellBookOnChange,
  sellCountOnChange,
  purchaseBook,
  purchaseBookOnChange,
  purchaseCountOnChange,
  returnBook,
  returnBookOnChange,
  returnCountOnChange,
  removeBook,
  removeBookOnChange,
  closeModal
}) => {
  return (
    <Grid columns='equal'>
      <Grid.Column>
        <Modal open={modalOpen} basic size='small'>
          <Modal.Header icon='book' content={msg} />
          <Modal.Actions>
            <Button
              color='green'
              inverted
              onClick={closeModal}
            ><Icon name='checkmark' /> OK</Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
      <Grid.Column width={3}>
        <Form
          onSubmit={
            e => {
              e.preventDefault();
              sellBook(sellBookData);
            }
          }
        >
          <Label as='a' color='blue' tag>Sell</Label>
          <Form.Field>
            <label htmlFor='sellBook'>Book</label>
            <Dropdown
              name='sellBook'
              placeholder='Select Book'
              search
              selection
              scrolling
              options={displayInventoryBooks}
              onChange={sellBookOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='sellCount'>Count</label>
            <Input
              name='sellCount'
              type='number'
              min='1'
              onChange={e => { sellCountOnChange(e.target.value); }}
            />
          </Form.Field>
          <Button>Sell</Button>
        </Form>
      </Grid.Column>
      <Grid.Column width={3}>
        <Form
          onSubmit={
            e => {
              e.preventDefault();
              purchaseBook(purchaseBookData);
            }
          }
        >
          <Label as='a' color='red' tag>Purchase</Label>
          <Form.Field>
            <label htmlFor='purchaseBook'>Book</label>
            <Dropdown
              name='purchaseBook'
              placeholder='Select Book'
              search
              selection
              scrolling
              options={displayBooks}
              onChange={purchaseBookOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='purchaseCount'>Count</label>
            <Input
              name='purchaseCount'
              type='number'
              min='1'
              onChange={e => { purchaseCountOnChange(e.target.value); }}
            />
          </Form.Field>
          <Button>Purchase</Button>
        </Form>
      </Grid.Column>
      <Grid.Column width={3}>
        <Form
          onSubmit={
            e => {
              e.preventDefault();
              returnBook(returnBookData);
            }
          }
        >
          <Label as='a' color='teal' tag>Return</Label>
          <Form.Field>
            <label htmlFor='returnBook'>Book</label>
            <Dropdown
              name='returnBook'
              placeholder='Select Book'
              search
              selection
              scrolling
              options={displayInventoryBooks}
              onChange={returnBookOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='returnCount'>Count</label>
            <Input
              name='returnCount'
              type='number'
              min='1'
              onChange={e => { returnCountOnChange(e.target.value); }}
            />
          </Form.Field>
          <Button>Return</Button>
        </Form>
      </Grid.Column>
      <Grid.Column width={3}>
        <Form
          onSubmit={
            e => {
              e.preventDefault();
              removeBook(removeBookData);
            }
          }
        >
          <Label as='a' color='orange' tag>Remove from Inventory</Label>
          <Form.Field>
            <label htmlFor='removeBook'>Book</label>
            <Dropdown
              name='removeBook'
              placeholder='Select Book'
              search
              selection
              scrolling
              options={displayInventoryBooks}
              onChange={removeBookOnChange}
            />
          </Form.Field>
          <Button>Remove</Button>
        </Form>
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

Mocking.propTypes = {
  displayBooks: PropTypes.arrayOf(PropTypes.shape()),
  displayInventoryBooks: PropTypes.arrayOf(PropTypes.shape()),
  sellBookData: PropTypes.shape(),
  purchaseBookData: PropTypes.shape(),
  returnBookData: PropTypes.shape(),
  removeBookData: PropTypes.shape(),
  msg: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  sellBook: PropTypes.func.isRequired,
  sellBookOnChange: PropTypes.func.isRequired,
  sellCountOnChange: PropTypes.func.isRequired,
  purchaseBook: PropTypes.func.isRequired,
  purchaseBookOnChange: PropTypes.func.isRequired,
  purchaseCountOnChange: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
  returnBookOnChange: PropTypes.func.isRequired,
  returnCountOnChange: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  removeBookOnChange: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

Mocking.defaultProps = {
  displayBooks: null,
  displayInventoryBooks: null,
  sellBookData: null,
  purchaseBookData: null,
  returnBookData: null,
  removeBookData: null
};

export default Mocking;
