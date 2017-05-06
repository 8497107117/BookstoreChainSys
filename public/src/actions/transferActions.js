import {
  SOCKET_CONNECT,
  GET_REGION,
  GET_INVENTORY_CHAIN,
  LOAD_TRANSFER,
  SEND_REQUEST,
  REMOVE_REQUEST,
  SEND_RESPONSE,
  TRANSFER_SEARCH_ONCHANGE,
  TRANSFER_REGION_ONCHANGE,
  TRANSFER_COUNT_ONCHANGE,
  UPDATE
} from './actionType';

const getRegion = (region) => {
  return {
    type: GET_REGION,
    region
  };
};

const getInventoryChain = (inventoryChain) => {
  return {
    type: GET_INVENTORY_CHAIN,
    inventoryChain
  };
};

export const requestRegion = () => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/transfer/region', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            dispatch(getRegion(result.region));
          }
        });
    }
    return { type: null };
  };
};

export const loadTransfer = (transfer) => {
  return {
    type: LOAD_TRANSFER,
    transfer
  };
};

export const sendRequest = (req) => {
  return {
    type: SEND_REQUEST,
    req
  };
};

export const removeRequest = (req) => {
  return {
    type: REMOVE_REQUEST,
    req
  };
};

export const sendResponse = (res) => {
  return {
    type: SEND_RESPONSE,
    res
  };
};

export const update = () => {
  return {
    type: UPDATE
  };
};

export const transferSearchOnChange = (searchValue) => {
  return {
    type: TRANSFER_SEARCH_ONCHANGE,
    searchValue
  };
};

export const transferRegionOnChange = (regionValue) => {
  return {
    type: TRANSFER_REGION_ONCHANGE,
    regionValue
  };
};

export const transferCountOnChange = (countValue) => {
  return {
    type: TRANSFER_COUNT_ONCHANGE,
    countValue
  };
};

export const requestInventoryChain = (data) => {
  return dispatch => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch('/api/transfer/inventoryChain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(({ success, result }) => {
          if (success) {
            dispatch(getInventoryChain(result.inventoryChain));
          }
        });
    }
    return { type: null };
  };
};

export const socketConnect = (socket) => {
  return {
    type: SOCKET_CONNECT,
    socket
  };
};
