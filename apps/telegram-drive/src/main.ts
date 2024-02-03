import { Hono } from "hono";
import { serve } from '@hono/node-server';
import { mainRouter } from "@/telegram-drive-router";

const app = new Hono().basePath('/api');
app.route('/', mainRouter);

serve({
    fetch: app.fetch,
    port: 3000,
}).on('listening', () => {
    console.log('Server is running at http://localhost:3000');
});