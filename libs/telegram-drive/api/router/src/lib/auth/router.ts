import { Hono } from 'hono';
import { prisma } from "@/telegram-drive-db";
import { redis } from "@/telegram-drive-redis";
import { zValidator } from '@hono/zod-validator';

import { SigninJSONSchema } from './schema.js';

// FIXME: This type is only for debugging purposes, it will be removed
type SignUpBody = {
    username: string;
    password: string;
}

export const authRouter = new Hono()
  .post('/signin', zValidator('json', SigninJSONSchema), async (c) => {
    const body = c.req.valid('json');
    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    });

    if(!user) {
        c.status(404);
        return c.json({ message: 'User not found' });
    }

    if(user.password !== body.password) {
        c.status(401);
        return c.json({ message: 'Invalid password' });
    }

    // TODO: Generate JWT token
    await redis.set('someTokenValue', user.id);

    c.status(200);
    return c.json({ message: 'Signed in!', user });
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

    // TODO: Generate JWT token
    await redis.set('someTokenValue', newUser.id);

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
