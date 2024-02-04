import { PrismaClient } from '@prisma/client/telegram-drive/index.js';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
