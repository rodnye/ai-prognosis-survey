'use client';
import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';

export const useIsVoted = (surveyId: string) => {
  const [userId] = useAuth();
  const [isVoted, setIsVoted] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchIsVoted = async () => {
      try {
        const response = await fetch(`/api/votes/${surveyId}`);
        if (response.ok) {
          const data = await response.json();
          setIsVoted(data.voted);
        } else {
          console.error('Error fetching vote status:', response.statusText);
          setIsVoted(null);
        }
      } catch (error) {
        console.error('Error fetching vote status:', error);
        setIsVoted(null);
      }
    };

    fetchIsVoted();
  }, [userId, surveyId]);

  return isVoted;
};
