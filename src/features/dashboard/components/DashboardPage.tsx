'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '../../shared/components/Button';

type SurveyResults = {
  survey: {
    title: string;
    questions: { id: number; text: string; options: string[] }[];
  };
  results: {
    questionId: number;
    votes: number[];
    totalVotes: number;
    comments: [number, string][];
  }[];
};

export function DashboardPage({ surveyId }: { surveyId: string }) {
  const [data, setData] = useState<SurveyResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard/' + surveyId);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl text-white">Cargando...</div>;
  }

  if (!data) {
    return <div className="text-center">No se encontraron datos.</div>;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Button variant="back" onClick={() => window.history.back()}>
        Volver
      </Button>
      <div className="flex flex-col">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Estadísticas de votaciones: {data.survey.title}
        </h1>
        <p className="mb-4 text-center text-lg text-gray-300">
          Total de participantes: {data.results[0]?.totalVotes || 0}
        </p>
        <div className="mb-8 flex flex-wrap justify-center">
          {data.results.map((result, index) => {
            const question = data.survey.questions.find(
              (q) => q.id === result.questionId,
            );
            return (
              <div
                key={result.questionId}
                className="m-3 mb-8 flex w-full max-w-sm flex-col justify-between rounded-lg bg-white/75 p-3"
              >
                <h2 className="mb-4 text-center text-lg font-semibold">
                  <span className="text-blue-900">{index + 1}. </span>
                  {question?.text}
                </h2>
                <div className="space-y-4">
                  {result.votes.map((vote, i) => {
                    const percentage = result.totalVotes
                      ? ((vote / result.totalVotes) * 100).toFixed(2)
                      : '0.00';
                    return (
                      <motion.div
                        key={i}
                        className="flex flex-col"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                      >
                        <span>{question?.options[i]}</span>
                        <div className="flex items-center">
                          <div className="h-6 w-3/4 overflow-hidden rounded-full bg-gray-200">
                            <motion.div
                              className="h-6 bg-blue-500"
                              style={{ width: `${percentage}%` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="ml-4">{percentage}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
