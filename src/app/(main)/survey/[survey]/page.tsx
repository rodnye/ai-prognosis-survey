import { notFound } from 'next/navigation';
import { SurveyPage } from '@/features/survey/components/SurveyPage';
import { getSurvey } from '@/features/survey/services/survey-storage';

export default async function Page({
  params,
}: {
  params: Promise<{ survey: string }>;
}) {
  const { survey: surveyId } = await params;
  const survey = await getSurvey(surveyId);
  if (!survey) return notFound();

  return <SurveyPage survey={survey} />;
}
