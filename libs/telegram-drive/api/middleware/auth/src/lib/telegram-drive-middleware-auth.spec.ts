import { telegramDriveMiddlewareAuth } from './telegram-drive-middleware-auth';

describe('telegramDriveMiddlewareAuth', () => {
  it('should work', () => {
    expect(telegramDriveMiddlewareAuth()).toEqual(
      'telegram-drive-middleware-auth'
    );
  });
});
