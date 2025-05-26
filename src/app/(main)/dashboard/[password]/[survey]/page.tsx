import { DashboardPage } from '@/features/dashboard/components/DashboardPage';

export default async function Page({
  params,
}: {
  params: Promise<{ survey: string }>;
}) {
  const { survey } = await params;

  return <DashboardPage surveyId={survey} />;
}
