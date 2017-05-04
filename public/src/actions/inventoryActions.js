import { GET_INVENTORY, SET_FILTER_INVENTORY_BOOKS } from './actionType';

const getInventory = (books) => {
  return {
    type: GET_INVENTORY,
    books
  };
};

export const setFilterInventoryBooks = (filterValue) => {
  return {
    type: SET_FILTER_INVENTORY_BOOKS,
    filterValue
  };
};

export const requestInventory = () => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/inventory', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            dispatch(getInventory(result.books));
          }
        });
    }
    return { type: null };
  };
};
