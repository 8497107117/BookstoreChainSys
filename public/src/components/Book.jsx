import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image, Popup } from 'semantic-ui-react';

const Book = ({ book, clickEvent }) => {
  return (
    <Popup
      trigger={
        <Card color={book.alert ? 'red' : null}>
          <Image src={book.Image} size='small' centered onClick={clickEvent} />
          <Card.Content>
            <Card.Header>{book.Name}</Card.Header>
            <Card.Meta>
              <span>Author: {book.Author}</span>
            </Card.Meta>
            <Card.Meta>
              {!!book.Translator && <span>Translator: {book.Translator}</span>}
            </Card.Meta>
            <Card.Description>
              Publishing: {book.PublishingName}
            </Card.Description>
            <Card.Description>
              Publishing Date:<br />{book.PublishingDate.split('T')[0]}
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
            {!!book.Count && <Card.Meta>
              <span>Count: {book.Count}</span>
            </Card.Meta>}
          </Card.Content>
        </Card>
      }
      header={`Publishing name: ${book.PublishingName}`}
      content={`Publishing phone: ${book.PublishingPhone}`}
      inverted
    />
  );
};

Book.propTypes = {
  book: PropTypes.shape().isRequired,
  clickEvent: PropTypes.func.isRequired
};

export default Book;
