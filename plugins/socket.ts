import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
  const socket = io('/', {
    transports: ['polling'],
  });

  return {
    provide: {
      io: socket,
    },
  };
});
