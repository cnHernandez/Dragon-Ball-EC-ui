import { Character, Planet } from '../services/dragonBallApi';
import gokuBlackImg from '../assets/goku-black.jpg'; // Importar la imagen de fondo
import fondoGrisImg from '../assets/fondo-gris.jpeg'; // Importar la nueva imagen de fondo
import vegetaErrorImg from '../assets/vegetaV.jpeg'; // Importar la imagen de error

interface PaginaCarritoProps {
  carritoPersonajes: Character[];
  carritoPlanetas: Planet[];
  eliminarPersonaje: (id: number) => void;
  eliminarPlaneta: (id: number) => void;
  setCarritoPersonajes: (personajes: Character[]) => void;
  setCarritoPlanetas: (planetas: Planet[]) => void;
}

function PaginaCarrito({ carritoPersonajes, carritoPlanetas, eliminarPersonaje, eliminarPlaneta, setCarritoPersonajes, setCarritoPlanetas }: PaginaCarritoProps) {
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

  const vaciarCarrito = () => {
    setCarritoPersonajes([]); // Vaciar personajes
    setCarritoPlanetas([]); // Vaciar planetas
  };

  const total = carritoPersonajes.reduce((acc, personaje) => acc + (personaje.price || 0) * (personaje.cantidad || 1), 0) +
                carritoPlanetas.reduce((acc, planeta) => acc + (planeta.price || 0) * (planeta.cantidad || 1), 0); // Calcular total basado en cantidad

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center p-8 text-center text-orange-500 bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoGrisImg})` }} // Establecer imagen de fondo
    >
      <h1 className="text-3xl font-bold mb-8 mt-8">Carrito de Compras</h1>
      {carritoPersonajes.length === 0 && carritoPlanetas.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {carritoPersonajes.map((personaje) => (
            <div
              key={personaje.id}
              className="flex flex-col items-center bg-opacity-80 p-4 rounded"
              style={{ backgroundImage: `url(${fondoGrisImg})`, backgroundSize: 'cover' }} // Establecer imagen de fondo
            >
              <img
                src={personaje.image}
                alt={personaje.name}
                className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-130"
              />
              <p className="mt-2 text-lg font-medium">Precio: ${personaje.price}</p>
              <p className="mt-2 text-lg font-medium">Cantidad: {personaje.cantidad}</p> {/* Mostrar cantidad */}
              <button
                onClick={() => eliminarPersonaje(personaje.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}
          {carritoPlanetas.map((planeta) => (
            <div
              key={planeta.id}
              className="flex flex-col items-center bg-opacity-80 p-4 rounded"
              style={{ backgroundImage: `url(${fondoGrisImg})`, backgroundSize: 'cover' }} // Establecer imagen de fondo
            >
              <img
                src={planeta.image}
                alt={planeta.name}
                className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
              />
              <p className="mt-2 text-lg font-medium">Precio: ${planeta.price}</p>
              <p className="mt-2 text-lg font-medium">Cantidad: {planeta.cantidad}</p> {/* Mostrar cantidad */}
              <button
                onClick={() => eliminarPlaneta(planeta.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      {carritoPersonajes.length > 0 || carritoPlanetas.length > 0 ? ( // Mostrar total solo si hay elementos
        <div
          className="mt-8 p-12 rounded-lg shadow-lg text-center bg-cover bg-center transition-transform transform hover:scale-120"
          style={{ backgroundImage: `url(${gokuBlackImg})` }}
        >
          <h2 className="text-3xl font-bold text-orange-500">Total: ${total}</h2>
        </div>
      ) : null}
      {carritoPersonajes.length > 0 || carritoPlanetas.length > 0 ? ( // Mostrar botón solo si hay elementos
        <button
          onClick={vaciarCarrito}
          className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600 transition"
        >
          Vaciar Carrito
        </button>
      ) : null}
    </div>
  );
}

export default PaginaCarrito;
