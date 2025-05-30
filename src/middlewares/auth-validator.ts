import { Middleware } from './lib';
import { getUserByCookies } from '@/features/survey/services/user-session';
import { NextResponse } from 'next/server';

export const authValidator = (): Middleware => async (req) => {
  let user = await getUserByCookies();

  if (!user) {
    return {
      pass: false,
      response: NextResponse.json(
        {
          message: 'No correct token provided',
        },
        { status: 401 },
      ),
    };
  }

  return {
    pass: true,
    data: {
      user,
    },
  };
};
