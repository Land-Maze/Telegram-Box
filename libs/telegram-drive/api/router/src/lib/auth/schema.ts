import { z } from 'zod';

export const SigninJSONSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const SignupJSONSchema = z.object({
    username: z.string(),
    password: z.string(),
});