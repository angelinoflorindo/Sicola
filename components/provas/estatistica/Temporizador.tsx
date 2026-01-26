// components/Prova/Temporizador.tsx
'use client';

import { useEffect, useState } from 'react';

interface Props {
  onFinish: () => void;
}

export function Temporizador({ onFinish }: Props) {
  const [segundos, setSegundos] = useState(2 * 60 * 60); // 2 horas

  useEffect(() => {
    if (segundos <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setSegundos((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [segundos, onFinish]);

  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const secs = segundos % 60;

  return (
    <div className="fixed top-4 right-4 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-lg font-mono text-lg">
      ⏱ {String(horas).padStart(2, '0')}:
      {String(minutos).padStart(2, '0')}:
      {String(secs).padStart(2, '0')}
    </div>
  );
}
