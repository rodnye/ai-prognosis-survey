import { createUser, getUser } from '@/features/survey/services/user-storage';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import { withMiddlewares } from '@/middlewares/lib';
import { NextResponse } from 'next/server';
import z from 'zod';

export const POST = withMiddlewares(
  [
    jsonBodyValidator(
      z.object({
        // TODO: mejorar validacion
        userId: z.string().min(5),
      }),
    ),
  ],
  async (request) => {
    const { userId } = request.data.body as { userId: string };
    let user = await getUser(userId);

    if (!user) {
      user = await createUser();
    }

    return NextResponse.json(
      {
        userId: user.id,
      },
      { status: 201 },
    );
  },
);
