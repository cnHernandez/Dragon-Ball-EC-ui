import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCharacterById, Character } from '../services/dragonBallApi';

function PaginaPersonajeDetalle() {
  const { id } = useParams<{ id: string }>();
  const [personaje, setPersonaje] = useState<Character | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        setCargando(true);
        const data = await fetchCharacterById(Number(id));
        setPersonaje(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener el personaje:', error);
        setError('No se pudo cargar el personaje.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPersonaje();
  }, [id]);

  if (cargando) {
    return <p className="text-white">Cargando personaje...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!personaje) {
    return <p className="text-white">Personaje no encontrado.</p>;
  }

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold">{personaje.name}</h2>
      <img src={personaje.image} alt={personaje.name} className="w-full h-auto max-h-96 object-contain" />
      <p>{personaje.description}</p>
    </div>
  );
}

export default PaginaPersonajeDetalle;
