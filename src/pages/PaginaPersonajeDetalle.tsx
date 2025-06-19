import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCharacterById, Character } from '../services/dragonBallApi';
import vegetaErrorImg from '../assets/vegeta-error.jpeg'; // Importar la imagen de error

function PaginaPersonajeDetalle() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Verificar autenticación

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <img 
          src={vegetaErrorImg} 
          alt="Error Vegeta" 
          className="mx-auto w-64 h-auto mb-4 bg-transparent rounded-full shadow-lg" 
        /> {/* Aplicar fondo transparente y estilos adicionales */}
        <p className="text-orange-500 font-bold">Acceso denegado. Por favor, inicia sesión.</p>
      </div>
    );
  }

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
