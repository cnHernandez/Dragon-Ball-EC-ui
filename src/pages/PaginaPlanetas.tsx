import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePlanetas } from '../hooks/usePlanetas';
import { Planet } from '../services/dragonBallApi';
import vegetaErrorImg from '../assets/vegeta-error.jpeg'; // Importar la imagen de error

interface PaginaPlanetasProps {
  carrito: Planet[];
  setCarrito: React.Dispatch<React.SetStateAction<Planet[]>>;
}

function PaginaPlanetas({ setCarrito }: PaginaPlanetasProps) {
  const { planetas, cargando, error } = usePlanetas();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Verificar autenticación
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para el mensaje

  const agregarAlCarrito = (planeta: Planet) => {
    const planetaConPrecio = { ...planeta, price: 200 }; // Agregar precio ficticio
    setCarrito((prevCarrito) => [...prevCarrito, planetaConPrecio]);
    setMensaje(`${planeta.name} agregado al carrito por $${planetaConPrecio.price}`); // Mostrar mensaje con precio
    setTimeout(() => setMensaje(null), 2000); // Ocultar mensaje después de 3 segundos
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <img src={vegetaErrorImg} alt="Error Vegeta" className="mx-auto w-64 h-auto mb-4" /> {/* Mostrar imagen */}
        <p className="text-orange-500 font-bold">Acceso denegado. Por favor, inicia sesión.</p>
      </div>
    );
  }

  if (cargando) {
    return <p className="text-white">Cargando planetas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-8 text-center bg-black text-orange-500">
      {mensaje && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {mensaje}
        </div>
      )}
      <Link to="/">
        <button className="mt-8 rounded-lg border border-transparent px-3 py-1.5 text-base font-medium bg-white text-orange-500 hover:border-blue-500 hover:shadow-lg focus:outline-none focus-visible:ring-4">
          Volver
        </button>
      </Link>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {planetas.map((planeta) => (
          <div key={planeta.id} className="border rounded shadow p-4 bg-gray-800 text-white transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold">{planeta.name}</h2>
            <img src={planeta.image} alt={planeta.name} className="w-full h-auto max-h-64 object-contain transition-transform transform hover:scale-110" />
            <p>{planeta.description}</p>
            <p className="mt-2 text-lg font-medium">Precio: $200</p> {/* Mostrar precio ficticio */}
            <button
              onClick={() => agregarAlCarrito(planeta)}
              className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600"
            >
              🛒 Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginaPlanetas;
