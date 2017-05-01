import { GET_INVENTORY } from './actionType';

const getInventory = (books) => {
  return {
    type: GET_INVENTORY,
    books
  };
};

const requestInventory = () => {
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

export default requestInventory;
