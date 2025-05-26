import { withMiddlewares } from '@/middlewares/lib';
import { surveyValidator } from '@/middlewares/survey-validator';
import { getSurvey } from '@/features/survey/services/survey-storage';
import { getAllUsers } from '@/features/survey/services/user-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares(
  [surveyValidator({ skipCompletionCheck: true })],
  async (request) => {
    const survey = request.data.survey as string;

    try {
      const surveyData = (await getSurvey(survey))!;

      const users = await getAllUsers();
      const votesData = surveyData.questions.map((question) => ({
        questionId: question.id,
        votes: question.options.map((option) => 0),
        totalVotes: 0,
        comments: [] as [number, string][],
      }));

      for (const user of users) {
        const userSurvey = user.surveys[survey];
        if (userSurvey && userSurvey.finished) {
          for (const question of surveyData.questions) {
            const vote = userSurvey.votes[question.id - 1];

            if (vote.option > 0) {
              votesData[question.id - 1].votes[vote.option - 1]++;
              votesData[question.id - 1].totalVotes++;
            }
            if (vote.comment) {
              votesData[question.id - 1].comments.push([
                vote.option,
                vote.comment,
              ]);
            }
          }
        }
      }

      return NextResponse.json({
        survey: surveyData,
        results: votesData,
      });
    } catch (e) {
      if (e instanceof Error) {
        return NextResponse.json({ message: e.message }, { status: 404 });
      }

      return NextResponse.json(
        { message: 'Error al procesar los resultados' },
        { status: 500 },
      );
    }
  },
);
