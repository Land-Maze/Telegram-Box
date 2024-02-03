import { Hono } from "hono";
import { serve } from '@hono/node-server';
import { telegramDriveRouter } from "@/telegram-drive-router";

const app = new Hono().basePath('/api/');

app.get('*', async (c) => {
    c.status(200);
    return c.json({ message: 'Hello, World!', path: c.req.path });
});

serve({
    fetch: app.fetch,
    port: 3000,
}).on('listening', () => {
    console.log('Server is running at http://localhost:3000');
    console.log("DEBUG: module exports:", telegramDriveRouter());
});