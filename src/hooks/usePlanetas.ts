import { useEffect, useState } from 'react';
import { fetchPlanets, Planet } from '../services/dragonBallApi';

export const usePlanetas = () => {
  const [planetas, setPlanetas] = useState<Planet[]>([]);
  const [cargando, setCargando] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const obtenerPlanetas = async () => {
      try {
        setCargando(true);
        const data = await fetchPlanets();
        setPlanetas(data.items);
        setError(null);
      } catch (error) {
        console.error('Error al obtener los planetas:', error);
        setError('No se pudieron cargar los planetas.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPlanetas();
  }, []);

  return { planetas, cargando, error };
};
