import {
  GET_BOOKS,
  //  SELL_BOOK,
  SELL_BOOK_ONCHANGE,
  SELL_COUNT_ONCHANGE,
  //  PURCHASE_BOOK,
  PURCHASE_BOOK_ONCHANGE,
  PURCHASE_COUNT_ONCHANGE,
  //  RETURN_BOOK,
  RETURN_BOOK_ONCHANGE,
  RETURN_COUNT_ONCHANGE,
  REMOVE_BOOK,
  REMOVE_BOOK_ONCHANGE,
  CLOSE_MODAL
} from './actionType';
import requestInventory from './inventoryActions';

const getBooks = (books) => {
  return {
    type: GET_BOOKS,
    books
  };
};

export const requestBooks = () => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/inventory/mocking/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            dispatch(getBooks(result.books));
          }
        });
    }
    return { type: null };
  };
};

export const sellBookOnChange = (value) => {
  return {
    type: SELL_BOOK_ONCHANGE,
    value
  };
};

export const sellCountOnChange = (value) => {
  return {
    type: SELL_COUNT_ONCHANGE,
    value
  };
};

export const sellBook = () => {

};

export const purchaseBookOnChange = (value) => {
  return {
    type: PURCHASE_BOOK_ONCHANGE,
    value
  };
};

export const purchaseCountOnChange = (value) => {
  return {
    type: PURCHASE_COUNT_ONCHANGE,
    value
  };
};

export const purchaseBook = () => {

};

export const returnBookOnChange = (value) => {
  return {
    type: RETURN_BOOK_ONCHANGE,
    value
  };
};

export const returnCountOnChange = (value) => {
  return {
    type: RETURN_COUNT_ONCHANGE,
    value
  };
};

export const returnBook = () => {

};

export const removeBookOnChange = (value) => {
  return {
    type: REMOVE_BOOK_ONCHANGE,
    value
  };
};

export const removeBook = (data) => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/inventory/mocking/remove', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            dispatch(requestInventory());
          }
          dispatch({
            type: REMOVE_BOOK,
            msg: result.msg
          });
        });
    }
    return { type: null };
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
