'use client';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/features/shared/components/Checkbox';
import { Button } from '@/features/shared/components/Button';
import { TextField } from '@/features/shared/components/TextField';
import { NotebookCard } from '@/features/shared/components/Card';
import { AnimatePresence } from 'framer-motion';

type PaginatorProps = {
  survey: Survey;
  onFinish: (surveyVotes: UserVote[]) => void;
};

export const Paginator = ({ survey, onFinish }: PaginatorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState<UserVote[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setVotes(
      survey.questions.map((q) => ({
        id: q.id,
        option: 0,
        comment: null,
      })),
    );
  }, [survey.questions]);

  const handleNext = () => {
    if (currentIndex < survey.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSubmitting(true);
      onFinish(votes);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex w-full max-w-lg flex-col">
      <AnimatePresence mode="wait">
        <NotebookCard key={currentIndex}>
          <div className="flex flex-col items-center text-center">
            <p className="py-6 text-center text-lg font-bold">
              <span className="text-blue-800">
                Pregunta {currentIndex + 1} de {survey.questions.length}
              </span>
              <br />
              {survey.questions[currentIndex].text}
            </p>
            <ul className="w-full pl-5">
              {survey.questions[currentIndex].options.map((option, index) => {
                let selected = votes[currentIndex]?.option === index + 1;

                return (
                  <li
                    key={index}
                    onClick={() => {
                      setVotes((prevVotes) =>
                        prevVotes.map((vote) =>
                          vote.id === survey.questions[currentIndex].id
                            ? { ...vote, option: index + 1 }
                            : vote,
                        ),
                      );
                    }}
                    className="mb-2 flex cursor-pointer items-center"
                  >
                    <Checkbox id={'ch' + index} checked={selected} />
                    <p
                      className={`ml-5 text-start transition-all duration-300 ${selected && 'text-blue-700'}`}
                    >
                      {option}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="my-12">
              <TextField
                placeholder="Comentario (opcional)"
                value={votes[currentIndex]?.comment || ''}
                onChange={(e) => {
                  setVotes((prevVotes) =>
                    prevVotes.map((vote) =>
                      vote.id === survey.questions[currentIndex].id
                        ? { ...vote, comment: e.target.value }
                        : vote,
                    ),
                  );
                }}
              />
            </div>
            <div className="flex w-full justify-between">
              <Button
                onClick={handlePrevious}
                disabled={submitting || currentIndex === 0}
              >
                Atrás
              </Button>
              <Button
                onClick={handleNext}
                disabled={submitting || votes[currentIndex]?.option === 0}
                withRow
              >
                {currentIndex === survey.questions.length - 1
                  ? 'Finalizar'
                  : 'Siguiente'}
              </Button>
            </div>
          </div>
        </NotebookCard>
      </AnimatePresence>
    </div>
  );
};
