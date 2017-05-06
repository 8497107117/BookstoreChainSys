import { GET_INVENTORY, SET_FILTER_INVENTORY_ALERT, INVENTORY_SEARCH_ONCHANGE } from './actionType';

const getInventory = (books) => {
  return {
    type: GET_INVENTORY,
    books
  };
};

export const setFilterInventoryAlert = (filterValue) => {
  return {
    type: SET_FILTER_INVENTORY_ALERT,
    filterValue
  };
};

export const searchInventory = (searchValue) => {
  return {
    type: INVENTORY_SEARCH_ONCHANGE,
    searchValue
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
