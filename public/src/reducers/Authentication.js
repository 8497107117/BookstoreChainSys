import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  authentucated: false,
  user: null
});

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Authentication;
