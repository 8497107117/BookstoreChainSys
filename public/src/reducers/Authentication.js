import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  isLogin: false,
  user: null
});

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Authentication;
