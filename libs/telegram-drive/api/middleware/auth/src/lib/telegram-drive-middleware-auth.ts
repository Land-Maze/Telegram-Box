import { prisma } from '@/telegram-drive-db';

prisma.$connect();

export function telegramDriveMiddlewareAuth(): string {
  return 'telegram-drive-middleware-auth';
}
