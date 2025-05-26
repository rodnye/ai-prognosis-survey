'use client';

import { useState, useEffect } from 'react';
import { TextField } from '@/features/shared/components/TextField';
import { Button } from '@/features/shared/components/Button';
import { NotebookCard } from '@/features/shared/components/Card';

export default function DashboardPage() {
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedPassword = localStorage.getItem('dashboard-password');
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleSubmit = () => {
    if (password) {
      localStorage.setItem('dashboard-password', password);
      window.location.href = `/dashboard/${password}`;
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <NotebookCard>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Escriba la contraseña"
        />
        <Button disabled={!password} onClick={handleSubmit}>
          Aceptar
        </Button>
      </NotebookCard>
    </div>
  );
}
