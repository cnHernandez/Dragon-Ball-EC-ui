import { Character, Planet } from '../services/dragonBallApi';

interface PaginaCarritoProps {
  carritoPersonajes: Character[];
  carritoPlanetas: Planet[];
  eliminarPersonaje: (id: number) => void;
  eliminarPlaneta: (id: number) => void;
}

function PaginaCarrito({ carritoPersonajes, carritoPlanetas, eliminarPersonaje, eliminarPlaneta }: PaginaCarritoProps) {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-8 text-center bg-black text-orange-500">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      {carritoPersonajes.length === 0 && carritoPlanetas.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {carritoPersonajes.map((personaje) => (
            <div key={personaje.id} className="flex flex-col items-center">
              <img src={personaje.image} alt={personaje.name} className="w-32 h-32 object-contain" />
              <button
                onClick={() => eliminarPersonaje(personaje.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}
          {carritoPlanetas.map((planeta) => (
            <div key={planeta.id} className="flex flex-col items-center">
              <img src={planeta.image} alt={planeta.name} className="w-32 h-32 object-contain" />
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
    </div>
  );
}

export default PaginaCarrito;
