import { z } from 'zod';

export const APIEnvironmentSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),

  NODE_ENV: z
    .union([
      z.literal('production'),
      z.literal('staging'),
      z.literal('development'),
      z.literal('test'),
    ])
    .default('development'),
});

const parsed = APIEnvironmentSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(parsed.error.message);
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof APIEnvironmentSchema> {}
  }
}

export {}