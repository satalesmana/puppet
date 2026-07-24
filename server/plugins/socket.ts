import type { NitroApp } from 'nitropack';
import { io } from '../socket';

// Bridges HTTP requests under /socket.io/ to the engine.io instance bound in
// server/socket.ts. This runs as a Nitro plugin so it's wired up the same way
// in `nuxt dev` and in the built/production server, unlike nuxt-internal-socket's
// `listen` hook which only fires during Nuxt's dev server lifecycle.
export default (nitroApp: NitroApp) => {
  nitroApp.router.use(
    '/socket.io/',
    defineEventHandler((event) => {
      io.engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    }),
  );
};
