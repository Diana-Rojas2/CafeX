'use client';
import React, { useState, useEffect } from 'react';

const Reloj = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, []); // El segundo argumento del useEffect es un array de dependencias. Al estar vacío, solo se ejecutará una vez al montar el componente.

  return (
    <div>
      Hora actual: {hora.toLocaleTimeString()}
    </div>
  );
};

export default Reloj;
