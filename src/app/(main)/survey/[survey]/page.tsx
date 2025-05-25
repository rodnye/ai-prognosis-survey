import { notFound } from 'next/navigation';
import { SurveyPage } from '@/features/survey/components/SurveyPage';
import { getSurvey } from '@/features/survey/services/survey-storage';
import { cookies } from 'next/headers';
import { getUser } from '@/features/survey/services/user-storage';

export default async function Page({
  params,
}: {
  params: Promise<{ survey: string }>;
}) {
  const { survey: surveyId } = await params;
  const survey = await getSurvey(surveyId);
  if (!survey) return notFound();

  const cookiesStore = await cookies();
  let userId = cookiesStore.get('user-id')?.value;
  if (userId) {
    const user = await getUser(userId);
    if (user?.surveys?.[surveyId]?.finished) {
      return <SurveyPage survey={survey} finished={true} />;
    }
  }

  return <SurveyPage survey={survey} />;
}
