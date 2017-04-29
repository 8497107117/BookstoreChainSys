import Immutable from 'immutable';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from '../actions';

const initialState = Immutable.fromJS({
  buttonClass: 'is-closed',
  overlayDisplay: 'none'
});

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_SIDEBAR:
      return state.set('buttonClass', 'is-closed').set('overlayDisplay', 'none');
    case OPEN_SIDEBAR:
      return state.set('buttonClass', 'is-open').set('overlayDisplay', '');
    default:
      return state;
  }
};

export default sidebar;
