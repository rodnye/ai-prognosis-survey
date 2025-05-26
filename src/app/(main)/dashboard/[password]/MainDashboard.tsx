import { Button } from '@/features/shared/components/Button';

interface MainDashboardPageProps {
  surveyIds: string[];
  password: string;
}

export function MainDashboardPage({
  surveyIds,
  password,
}: MainDashboardPageProps) {
  return (
    <div>
      {surveyIds.map((id) => (
        <Button key={id} to={`/dashboard/${password}/${id}`}>
          {id}
        </Button>
      ))}
    </div>
  );
}
