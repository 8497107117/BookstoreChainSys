import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';

const Book = ({ book }) => {
  return (
    <Card>
      <Image src={book.Image} size='small' centered />
      <Card.Content>
        <Card.Header>{book.Name}</Card.Header>
        <Card.Meta>
          <span>Author: {book.Author}</span>
        </Card.Meta>
        <Card.Meta>
          {!!book.Translator && <span>Translator: {book.Translator}</span>}
        </Card.Meta>
        <Card.Description>
          Publishing: {book.Publishing}
        </Card.Description>
        <Card.Description>
          Publishing Date: {book.PublishingDate.split('T')[0]}
        </Card.Description>
        <Card.Description>
          Language: {book.Language}
        </Card.Description>
        <Card.Description>
          Type: {book.Type}
        </Card.Description>
        <Card.Description>
          ISBN: {book.ISBN}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='dollar' />{book.Price}
        <Card.Meta>
          <span>Count: {book.Count}</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

Book.propTypes = {
  book: PropTypes.shape().isRequired
};

export default Book;
