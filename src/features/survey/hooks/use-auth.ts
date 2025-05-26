'use client';
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';

let storedUserId: string | null = null;

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(storedUserId);
  const [error, setError] = useState<string | null>(null);
  const cookiesStore = useCookies();

  useEffect(() => {
    if (!userId) {
      (async () => {
        let tempUserId = localStorage.getItem('user-id') || 'empty-user-id';

        // hacer fetch
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: tempUserId }),
        });

        if (!response.ok) {
          return setError('Authentication failed, please try again.');
        }

        tempUserId = (await response.json()).userId as string;
        localStorage.setItem('user-id', tempUserId);
        cookiesStore.set('user-id', tempUserId);
        setUserId(tempUserId);
        storedUserId = tempUserId;
      })();
    }
  }, []);

  return [userId, error] as const;
};
