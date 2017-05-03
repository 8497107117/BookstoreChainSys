import { GET_TRANSACTION } from './actionType';

const getTransaction = (transaction) => {
  return {
    type: GET_TRANSACTION,
    transaction
  };
};

const requestTransaction = () => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/transaction', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            dispatch(getTransaction(result.transaction));
          }
        });
    }
    return { type: null };
  };
};

export default requestTransaction;
