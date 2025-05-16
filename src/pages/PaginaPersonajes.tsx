import { useState } from 'react';
import useObtenerPersonajes from '../hooks/useFetchCharacters';
import { fetchCharacterById, Character } from '../services/dragonBallApi';
import ListaPersonajes from '../components/CharacterList'; // Eliminar la importación de ListaPersonajesProps
import ListaTransformaciones from '../components/TransformationsList';


interface PaginaPersonajesProps {
  carrito: Character[];
  setCarrito: React.Dispatch<React.SetStateAction<Character[]>>;
}

function PaginaPersonajes({ setCarrito }: PaginaPersonajesProps) {
  const { personajes, cargando, error } = useObtenerPersonajes();
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Character | null>(null);
  const [mostrarTransformaciones, setMostrarTransformaciones] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para el mensaje

  if (cargando) {
    return <p className="text-white">Cargando personajes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const personajesFiltrados = personajes.filter(personaje =>
    personaje.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const manejarMasInfo = async (characterId: number) => {
    try {
      const personaje = await fetchCharacterById(characterId);
      setPersonajeSeleccionado(personaje);
      setMostrarTransformaciones(false);
    } catch (error) {
      console.error('Error al obtener el personaje:', error);
    }
  };

  const manejarMostrarTransformaciones = () => {
    setMostrarTransformaciones(true);
  };

  const manejarVolver = () => {
    setPersonajeSeleccionado(null);
    setMostrarTransformaciones(false);
  };

  const agregarAlCarrito = (personaje: Character) => {
    setCarrito((prevCarrito) => [...prevCarrito, personaje]);
    setMensaje(`${personaje.name} agregado al carrito`); // Mostrar mensaje
    setTimeout(() => setMensaje(null), 2000); // Ocultar mensaje después de 3 segundos
  };

  const claseBoton = "rounded-lg border border-transparent px-3 py-1.5 text-base font-medium bg-white text-orange-500 hover:border-blue-500 hover:shadow-lg focus:outline-none focus-visible:ring-4";

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-8 text-center bg-black text-orange-500">
      {mensaje && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {mensaje}
        </div>
      )}
      {personajeSeleccionado && (
        !mostrarTransformaciones && (
          <button onClick={manejarVolver} className={claseBoton}>Volver</button>
        )
      )}
      {!personajeSeleccionado && (
        <input
          type="text"
          placeholder="Buscar Personajes"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="block mx-auto my-20 p-2 text-lg border rounded"
        />
      )}
      {personajeSeleccionado ? (
        mostrarTransformaciones ? (
          <div className="text-center p-8">
            {personajeSeleccionado.transformations && personajeSeleccionado.transformations.length > 0 ? (
              <div>
                <h3 className="text-2xl font-bold">Transformaciones</h3>
                <ListaTransformaciones transformaciones={personajeSeleccionado.transformations} />
              </div>
            ) : (
              <p>El personaje no tiene transformaciones</p>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold leading-tight">{personajeSeleccionado.name}</h2>
            <img src={personajeSeleccionado.image} alt={personajeSeleccionado.name} className="w-full h-auto max-h-96 object-contain transition-transform transform hover:scale-110" />
            <p>{personajeSeleccionado.description}</p>
            {personajeSeleccionado.transformations && personajeSeleccionado.transformations.length > 0 && (
              <button onClick={manejarMostrarTransformaciones} className={claseBoton}>Ver Transformaciones</button>
            )}
          </div>
        )
      ) : (
        <div>
          <ListaPersonajes 
            personajes={personajesFiltrados} 
            onMasInfo={manejarMasInfo} 
            onAgregarAlCarrito={agregarAlCarrito} 
            claseBoton={claseBoton} 
          />
        
        </div>
      )}
    </div>
  );
}

export default PaginaPersonajes;
