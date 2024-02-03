import { Hono } from 'hono';

export const authRouter = new Hono()
  .post('/login', async (c) => {
    c.status(200);
    return c.json({ message: 'Hello, World!', path: c.req.path });
  })
  .post('/register', async (c) => {
    c.status(200);
    return c.json({ message: 'Hello, World!', path: c.req.path });
  })
  .get('/logout', async (c) => {
    c.status(200);
    return c.json({ message: 'Hello, World!', path: c.req.path });
  });
