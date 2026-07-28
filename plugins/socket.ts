import { io as createSocketClient } from 'socket.io-client';

const createNoopSocket = () => ({
  connected: false,
  connect: () => undefined,
  disconnect: () => undefined,
  emit: () => undefined,
  on: () => undefined,
  off: () => undefined,
  once: () => undefined,
});

export default defineNuxtPlugin(() => {
  const socketEnabled =
    import.meta.env.NUXT_PUBLIC_ENABLE_SOCKET !== 'false' &&
    !import.meta.env.VERCEL;

  const socket = socketEnabled
    ? createSocketClient('/', {
        transports: ['polling'],
      })
    : createNoopSocket();

  return {
    provide: {
      io: socket,
    },
  };
});
