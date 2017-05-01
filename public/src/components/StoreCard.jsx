import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const StoreCard = ({ bookstore }) => (
  <Card color="grey">
    <Card.Content>
      <Card.Header>{bookstore.Name}</Card.Header>
      <Card.Meta>{bookstore.Region}</Card.Meta>
      <Card.Description>{bookstore.Phone}</Card.Description>
      <Card.Description>{bookstore.Address}</Card.Description>
    </Card.Content>
  </Card>
);

StoreCard.propTypes = {
  bookstore: PropTypes.shape().isRequired
};

export default StoreCard;
