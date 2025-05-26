'use client';
import { useState } from 'react';
import { Paginator } from './Paginator';
import { NotebookCard } from '@/features/shared/components/Card';
import { useAuth } from '../hooks/use-auth';
import { useIsVoted } from '../hooks/use-survey';
import { AnimatePresence, motion } from 'framer-motion';

export function SurveyPage({ survey }: { survey: Survey }) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userId, userIdError] = useAuth();
  const isVoted = useIsVoted(survey.id);

  return (
    <AnimatePresence mode="wait">
      {(userId === null || isVoted === null) && (
        <NotebookCard key="loading">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Cargando...</h1>
            <p> Por favor, espere mientras se carga la encuesta. </p>
          </div>
        </NotebookCard>
      )}

      {(errorMessage || userIdError) && (
        <NotebookCard key="error">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Hubo un error!</h1>
            <p> Por favor, intente recargar la página e intente denuevo. </p>
          </div>
        </NotebookCard>
      )}

      {(successMessage || isVoted) && (
        <NotebookCard key="success">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Todo en orden!</h1>
            <p> Su voto ya ha sido registrado, gracias por participar </p>
          </div>
        </NotebookCard>
      )}

      {!successMessage &&
        isVoted === false &&
        !errorMessage &&
        !userIdError && (
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
        )}
    </AnimatePresence>
  );
}
