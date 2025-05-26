import { listSurveys } from '@/features/survey/services/survey-storage';
import { MainDashboardPage } from './MainDashboard';

export default async function Page({
  params,
}: {
  params: Promise<{ password: string }>;
}) {
  const { password } = await params;
  const surveyIds = await listSurveys();

  return <MainDashboardPage password={password} surveyIds={surveyIds} />;
}
