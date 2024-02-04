import { Hono } from 'hono';
import { prisma } from "@/telegram-drive-db";

// FIXME: This type is only for debugging purposes, it will be removed
type SignUpBody = {
    username: string;
    password: string;
}

export const authRouter = new Hono()
  .post('/signin', async (c) => {
    c.status(200);
    return c.json({ message: 'Hello, World!', path: c.req.path });
  })
  .post('/signup', async (c) => {
    const body = await c.req.json<SignUpBody>();
    if(!body.username || !body.password) {
        c.status(400);
        return c.json({ message: 'Username and password are required' });
    }
    const newUser = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    });
    c.status(200);
    return c.json({ message: 'Created user', user: newUser});
  })
  .get('/signout', async (c) => {
    c.status(200);
    return c.json({ message: 'Hello, World!', path: c.req.path });
  })
  .get('/me', async (c) => {
    const id = c.req.query("id");
    console.log(id);
    if(!id) {
        c.status(400);
        return c.json({ message: 'User id is required' });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if(!user) {
        c.status(404);
        return c.json({ message: 'User not found' });
    }
    c.status(200);
    return c.json({ message: 'Found user!', user });
  });
