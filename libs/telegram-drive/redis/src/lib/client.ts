import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => {
  throw new Error('Redis Client Error: ' + err);
});

redis.connect();

export { redis };
