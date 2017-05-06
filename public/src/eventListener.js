import {
  loadTransfer,
  update,
  requestInventory
} from './actions';

const handleTransfer = (id, transfer) => {
  let waitResponse = [];
  let toRespond = [];
  let msgCount = 0;
  transfer.forEach((t) => {
    if (t.ReqID === id) {
      waitResponse.push(t);
      msgCount = t.Accept ? msgCount + 1 : msgCount;
    }
    if (t.ResID === id) {
      toRespond.push(t);
      msgCount += 1;
    }
  });
  return { waitResponse, toRespond, msgCount };
};

const eventListener = (store) => {
  const socket = store.getState().getIn(['transfer', 'socket']);

  socket.on('load transfer', ({ id, transfer }) => {
    store.dispatch(loadTransfer(handleTransfer(id, transfer)));
  });
  socket.on('update', (shouldUpdateInventory) => {
    store.dispatch(update());
    if (shouldUpdateInventory) {
      store.dispatch(requestInventory());
    }
  });
};

export default eventListener;
