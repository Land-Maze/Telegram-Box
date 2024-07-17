import z from 'zod';

export const APIEnvSchema = z.object({
  DASHBOARD_URL: z.string(),
  API_URL: z.string(),

  NODE_ENV: z.union([
    z.literal('development'),
    z.literal('production'),
    z.literal('test'),
  ]),
});

const parsedEnv = APIEnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.flatten().fieldErrors);
  throw new Error('Invalid env variables');
}

export const env = parsedEnv;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof APIEnvSchema> {}
  }
}
