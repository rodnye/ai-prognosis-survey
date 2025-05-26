import { listSurveys } from '@/features/survey/services/survey-storage';
import { Middleware } from './lib';
import { NextResponse } from 'next/server';

/**
 * Nota: requiere de auth-validator si skipCompletionCheck es false
 */
export const surveyValidator = (options?: {
  skipCompletionCheck?: boolean;
}): Middleware => {
  const { skipCompletionCheck = false } = options || {};

  return async (req, { params }) => {
    const { survey } = await params;

    let finded = (await listSurveys()).find((s) => s === survey);
    if (!finded) {
      return {
        pass: false,
        response: NextResponse.json(
          { message: `Encuesta no encontrada: ${survey}` },
          { status: 404 },
        ),
      };
    }

    if (!skipCompletionCheck) {
      const user = req.data.user as User;
      if (!user) {
        return {
          pass: false,
          response: NextResponse.json(
            { message: 'Usuario no autenticado' },
            { status: 401 },
          ),
        };
      }

      if (user.surveys[survey] && user.surveys[survey].finished) {
        return {
          pass: false,
          response: NextResponse.json(
            { message: 'Encuesta ya completada', voted: true },
            { status: 403 },
          ),
        };
      }
    }
    return {
      pass: true,
      data: {
        survey,
      },
    };
  };
};
