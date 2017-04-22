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
    const passwordPattern = /^[A-Za-z0-9]{6,16}$/;
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
        errMsg: 'Only characters or digits smaller than 16 and more than 6'
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
const loginSuccess = (result) => {
  console.log(result);
  return {
    type: LOGIN_SUCCESS
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
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(result => {
            dispatch(pristineLoginForm());
            dispatch(loginSuccess(result));
          })
          .catch(err => {
            console.log(err);
            err.forEach(({ field, errMsg }) => {
              dispatch(loginFail(field, errMsg));
            });
          });
      })
      .catch(err => {
        err.forEach(({ field, errMsg }) => {
          dispatch(loginFail(field, errMsg));
        });
      });
  };
};
