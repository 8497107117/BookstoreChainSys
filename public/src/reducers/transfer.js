import Immutable, { List } from 'immutable';
import {
  TRANSFER_SEARCH_ONCHANGE,
  TRANSFER_REGION_ONCHANGE,
  TRANSFER_COUNT_ONCHANGE,
  LOGIN_SUCCESS,
  GET_REGION,
  GET_INVENTORY_CHAIN,
  LOAD_TRANSFER,
  SEND_REQUEST,
  REMOVE_REQUEST,
  SEND_RESPONSE,
  UPDATE,
  SOCKET_CONNECT
} from '../actions';

const reviseRegionInfo = (regions) => {
  let revisedRegions = [];
  regions.forEach((region) => {
    revisedRegions.push({
      value: region.id,
      text: region.Region
    });
  });
  return revisedRegions;
};

const initialState = Immutable.fromJS({
  socket: null,
  search: {
    book: '',
    region: 0,
  },
  requestCount: 1,
  Region: [],
  displayRegion: [],
  searchResult: [],
  waitResponse: [],
  toRespond: [],
  msgCount: 0
});

const transfer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSFER_SEARCH_ONCHANGE:
      return state.setIn(['search', 'book'], action.searchValue);
    case TRANSFER_REGION_ONCHANGE:
      return state.setIn(['search', 'region'], action.regionValue);
    case TRANSFER_COUNT_ONCHANGE:
      return state.set('requestCount', parseInt(action.countValue, 10));
    case GET_REGION:
      return state.set('Region', List(action.region))
        .set('displayRegion', List(reviseRegionInfo(action.region)));
    case GET_INVENTORY_CHAIN:
      return state.set('searchResult', List(action.inventoryChain));
    case LOAD_TRANSFER:
      return state.set('waitResponse', List(action.transfer.waitResponse))
        .set('toRespond', List(action.transfer.toRespond))
        .set('msgCount', action.transfer.msgCount);
    case SEND_REQUEST:
      state.get('socket').emit('send request', action.req);
      return state;
    case REMOVE_REQUEST:
      state.get('socket').emit('remove request', action.req);
      return state;
    case SEND_RESPONSE:
      state.get('socket').emit('send response', action.res);
      return state;
    case UPDATE:
      state.get('socket').emit('get transfer');
      return state;
    case SOCKET_CONNECT:
      return state.set('socket', action.socket);
    case LOGIN_SUCCESS:
      const socket = state.get('socket');
      socket.emit('authentication connect', action.store.id);
      socket.emit('get transfer');
      return state;
    default:
      return state;
  }
};

export default transfer;
