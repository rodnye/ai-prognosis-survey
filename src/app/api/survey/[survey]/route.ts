import { withMiddlewares } from '@/middlewares/lib';
import { getSurvey } from '@/features/survey/services/survey-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([], async (_, { params }) => {
  const { survey } = await params;

  try {
    const surveyData = await getSurvey(survey);

    if (!surveyData) {
      throw new Error('Empty');
    }
    return NextResponse.json({
      message: `Encuesta: ${survey}`,
      survey: surveyData,
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Error al cargar la encuesta' },
      { status: 500 },
    );
  }
});
