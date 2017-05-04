import {
  GET_BOOKS,
  SELL_BOOK_ONCHANGE,
  SELL_COUNT_ONCHANGE,
  PURCHASE_BOOK_ONCHANGE,
  PURCHASE_COUNT_ONCHANGE,
  RETURN_BOOK_ONCHANGE,
  RETURN_COUNT_ONCHANGE,
  REMOVE_BOOK_ONCHANGE,
  MOCK_DONE,
  CLOSE_DIMMER
} from './actionType';
import { requestInventory } from './inventoryActions';
import requestTransaction from './transactionActions';

const getBooks = (books) => {
  return {
    type: GET_BOOKS,
    books
  };
};
const mockDone = (msg) => {
  return {
    type: MOCK_DONE,
    msg
  };
};

export const requestBooks = () => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/mocking/books', {
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

export const sellBook = (data) => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/mocking/sell', {
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
            dispatch(requestTransaction());
          }
          dispatch(mockDone(result.msg));
        });
    }
    return { type: null };
  };
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

export const removeBookOnChange = (value) => {
  return {
    type: REMOVE_BOOK_ONCHANGE,
    value
  };
};

export const withPublishing = (data, operation) => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`/api/mocking/${operation}`, {
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
          dispatch(mockDone(result.msg));
        });
    }
    return { type: null };
  };
};

export const closeDimmer = () => {
  return {
    type: CLOSE_DIMMER
  };
};
