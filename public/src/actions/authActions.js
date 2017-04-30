import 'whatwg-fetch';
import {
  PRISTINE_LOGIN_FORM,
  LOGIN_ONCHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './actionType';

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
const loginSuccess = (store, token) => {
  sessionStorage.setItem('token', token);
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
              dispatch(pristineLoginForm());
              dispatch(loginSuccess(result, token));
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
  return dispath => {
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
            dispath(loginSuccess(result, token));
          }
        });
    }
    return { type: null };
  };
};
