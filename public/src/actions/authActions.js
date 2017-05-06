import 'whatwg-fetch';
import {
  PRISTINE_LOGIN_FORM,
  LOGIN_ONCHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './actionType';
import { requestInventory } from './inventoryActions';
import { requestBooks } from './mockingActions';
import requestTransaction from './transactionActions';
import { requestRegion } from './transferActions';

const check = ({ store, password }) => {
  return new Promise((resolve, reject) => {
    const storePattern = /^[A-Za-z0-9]{4,16}$/;
    const passwordPattern = /^[A-Za-z0-9]{4,16}$/;
    let rejectReason = [];
    let err = false;
    if (!storePattern.test(store) || !store) {
      err = true;
      rejectReason.push({
        field: 'store',
        errMsg: 'Only characters or digits smaller than 16 and more than 4'
      });
    }
    if (!passwordPattern.test(password) || !password) {
      err = true;
      rejectReason.push({
        field: 'password',
        errMsg: 'Only characters or digits smaller than 16 and more than 4'
      });
    }
    if (err) {
      reject(rejectReason);
    }
    else {
      resolve();
    }
  });
};

//  login
const loginSuccess = (store) => {
  return {
    type: LOGIN_SUCCESS,
    store
  };
};

const loginFail = (field, errMsg) => {
  return {
    type: LOGIN_FAIL,
    field,
    errMsg
  };
};

const requestThings = () => {
  return dispatch => {
    dispatch(requestInventory());
    dispatch(requestTransaction());
    dispatch(requestRegion());
    dispatch(requestBooks());
  };
};

export const pristineLoginForm = () => {
  document.getElementById('login-store').value = '';
  document.getElementById('login-password').value = '';
  return {
    type: PRISTINE_LOGIN_FORM
  };
};

export const loginOnChange = (field, value) => {
  return {
    type: LOGIN_ONCHANGE,
    field,
    value
  };
};

export const login = (data) => {
  return dispatch => {
    check(data)
      .then(() => {
        fetch('/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(({ success, result, token }) => {
            if (success) {
              sessionStorage.setItem('token', token);
              dispatch(pristineLoginForm());
              dispatch(loginSuccess(result));
              dispatch(requestThings());
            }
            else {
              result.forEach(({ field, errMsg }) => {
                dispatch(loginFail(field, errMsg));
              });
            }
          });
      })
      .catch(err => {
        err.forEach(({ field, errMsg }) => {
          dispatch(loginFail(field, errMsg));
        });
      });
  };
};

export const verifyAuth = () => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/verifyAuth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            sessionStorage.setItem('token', token);
            dispatch(loginSuccess(result));
            dispatch(requestThings());
          }
        });
    }
    return { type: null };
  };
};

export const logout = () => {
  sessionStorage.removeItem('token');
  return {
    type: LOGOUT
  };
};
