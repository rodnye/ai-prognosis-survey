'use client';
import { useEffect, useState } from 'react';
import { Paginator } from './Paginator';
import { NotebookCard } from '@/features/shared/components/Card';
import { useCookies } from 'next-client-cookies';
import { notFound } from 'next/navigation';

export function SurveyPage({
  survey,
  finished = false,
}: {
  survey: Survey;
  finished?: boolean;
}) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cookiesStore = useCookies();

  useEffect(() => {
    (async () => {
      let userId = cookiesStore.get('user-id') || 'is-new-user';

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) return notFound();

      userId = (await res.json()).userId as string;
      cookiesStore.set('user-id', userId);
    })();
  }, []);

  if (errorMessage) {
    return (
      <NotebookCard>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Hubo un error!</h1>
          <p> Por favor, intente recargar la página e intente denuevo. </p>
        </div>
      </NotebookCard>
    );
  }

  if (successMessage || finished) {
    return (
      <NotebookCard>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Todo en orden!</h1>
          <p> Su voto ya ha sido registrado, gracias por participar </p>
        </div>
      </NotebookCard>
    );
  }

  return (
    <Paginator
      survey={survey}
      onFinish={async (surveyVotes) => {
        try {
          const res = await fetch('/api/votes/' + survey.id, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ votes: surveyVotes }),
          });
          if (!res.ok) throw res;

          const data = await res.json();
          setSuccessMessage(data?.message || 'todo ok');
        } catch (res) {
          if (res instanceof Response) {
            const status = res.status;
            setErrorMessage('error ' + status || 'error desconocido');
          }
        }
        console.log('Encuesta completada:', surveyVotes);
      }}
    />
  );
}
