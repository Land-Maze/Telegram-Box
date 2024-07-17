import '@/env';

import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

const port = Number.parseInt(process.env.API_URL.split(':')[2]) || 3000;

serve({
  fetch: app.fetch,
  port: port,
}).on('listening', () => {
  console.log(
    `Server listening on port \x1b[92m${
      process.env.API_URL.split(':').slice(0, 2).join(':') + ':' + port
    }\x1b[0m`
  );
});
