import {REACT_APP_BASE_URL} from '@env';

if (!window.location) {
  window.navigator.userAgent = 'ReactNative';
}

// This must be below your `window.navigator` hack above
const io = require('../node_modules/socket.io-client/dist/socket.io');
export const socket = io(REACT_APP_BASE_URL, {
  transports: ['websocket'], // you need to explicitly tell it to use websockets
  extraHeaders: {
    role: 'client',
  },
});

export const connectToSocket = () => {
  socket.connect();
  console.log('connected');
};

export const disconnectSocket = () => {
  socket.disconnect();
};
