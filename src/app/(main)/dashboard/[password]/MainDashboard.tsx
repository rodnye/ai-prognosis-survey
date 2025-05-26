'use client';
import { Button } from '@/features/shared/components/Button';
import { NotebookCard } from '@/features/shared/components/Card';

interface MainDashboardPageProps {
  surveyIds: string[];
  password: string;
}

export function MainDashboardPage({
  surveyIds,
  password,
}: MainDashboardPageProps) {
  const handleShareSurvey = (id: string) => {
    const surveyUrl = `${window.location.origin}/survey/${id}`;
    navigator.clipboard.writeText(surveyUrl);
    alert('¡Enlace copiado al portapapeles!');
  };

  return (
    <div className="flex flex-wrap">
      {surveyIds.map((id) => (
        <div key={id} className="m-2 max-w-md">
          <NotebookCard>
            <div className="flex flex-col items-start text-start">
              <h3 className="mb-2 text-center text-lg font-bold">{id}</h3>
              <Button to={`/survey/${id}`}>Encuesta</Button>
              <Button onClick={() => handleShareSurvey(id)}>Compartir</Button>
              <Button to={`/dashboard/${password}/${id}`}>Abrir Panel</Button>
            </div>
          </NotebookCard>
        </div>
      ))}
    </div>
  );
}
