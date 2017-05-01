import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';

const CardInstance = ({ bookstore }) => (
  <Card color="grey">
    <Card.Content>
      <Card.Header>{bookstore.Name}</Card.Header>
      <Card.Meta>{bookstore.Region}</Card.Meta>
      <Card.Description>{bookstore.Phone}</Card.Description>
      <Card.Description>{bookstore.Address}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button basic color='red'>Logout</Button>
    </Card.Content>
  </Card>
);

CardInstance.propTypes = {
  bookstore: PropTypes.shape().isRequired
};

export default CardInstance;
