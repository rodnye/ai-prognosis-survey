import { NextResponse } from 'next/server';
import { withMiddlewares } from '@/middlewares/lib';
import { authValidator } from '@/middlewares/auth-validator';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import { surveyValidator } from '@/middlewares/survey-validator';
import { z } from 'zod';
import { updateUserSurvey } from '@/features/survey/services/user-storage';

export const GET = withMiddlewares(
  [authValidator(), surveyValidator({ skipCompletionCheck: true })],
  async (req) => {
    const user = req.data.user as User;
    return NextResponse.json({
      voted: user.surveys[req.data.survey as string]?.finished ?? false,
    });
  },
);

export const POST = withMiddlewares(
  [
    authValidator(),
    surveyValidator(),
    jsonBodyValidator(
      z.object({
        votes: z.array(
          z.object({
            id: z.number().int().positive(),
            option: z.number().int().positive(),
            comment: z.string().nullable(),
          }),
        ),
      }),
    ),
  ],
  async (req) => {
    const body = req.data.body as { votes: UserVote[] };
    const surveyId = req.data.survey as string;
    const user = req.data.user as User;

    await updateUserSurvey(user.id, {
      surveyId,
      finished: true,
      votes: body.votes,
    });

    return NextResponse.json(
      {
        message: `Voto registrado para la encuesta ${surveyId}`,
        vote: body,
      },
      { status: 201 },
    );
  },
);
