import Immutable from 'immutable';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, LOGOUT } from '../actions';

const initialState = Immutable.fromJS({
  buttonClass: 'is-closed',
  overlayDisplay: 'none',
  sidebarVisible: false
});

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_SIDEBAR:
      return state.set('buttonClass', 'is-closed')
        .set('overlayDisplay', 'none')
        .set('sidebarVisible', false);
    case OPEN_SIDEBAR:
      return state.set('buttonClass', 'is-open')
        .set('overlayDisplay', '')
        .set('sidebarVisible', true);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default sidebar;
