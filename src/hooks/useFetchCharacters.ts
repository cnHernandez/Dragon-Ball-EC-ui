import { useState, useEffect } from 'react';
import { fetchCharacters, Character } from '../services/dragonBallApi';

const useObtenerPersonajes = () => {
  const [personajes, setPersonajes] = useState<Character[]>([]);
  const [cargando, setCargando] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        setCargando(true);
        const data = await fetchCharacters();
        setPersonajes(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener personajes:', error);
        setError('No se pudieron cargar los personajes.');
        setPersonajes([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerPersonajes();
  }, []);

  return { personajes, cargando, error };
};

export default useObtenerPersonajes;
