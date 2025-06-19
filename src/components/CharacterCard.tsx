import React from 'react';
import { Character } from '../services/dragonBallApi';
import fondoGrisImg from '../assets/fondo-gris.jpeg'; // Importar la imagen de fondo

interface TarjetaPersonajeProps {
  personaje: Character;
  onMasInfo: (characterId: number) => void;
  onAgregarAlCarrito: (personaje: Character) => void; // Nueva propiedad
  claseBoton: string;
}

// Componente para mostrar la tarjeta de un personaje
const TarjetaPersonaje: React.FC<TarjetaPersonajeProps> = ({ personaje, onMasInfo, onAgregarAlCarrito, claseBoton }) => {
  return (
    <div
      className="border rounded shadow p-4 text-white transition-transform transform hover:scale-105"
      style={{ backgroundImage: `url(${fondoGrisImg})`, backgroundSize: 'cover' }} // Establecer imagen de fondo
    >
      <h2 className="text-xl font-bold">{personaje.name}</h2>
      <img src={personaje.image} alt={personaje.name} className="w-full h-auto max-h-52 object-contain transition-transform transform hover:scale-110" />
      <p><strong>Raza:</strong> {personaje.race}</p>
      <p><strong>Género:</strong> {personaje.gender}</p>
      <p><strong>Ki:</strong> {personaje.ki}</p>
      <p><strong>Ki Máximo:</strong> {personaje.maxKi}</p>
      <p><strong>Afiliación:</strong> {personaje.affiliation}</p>
      {personaje.originPlanet && <p><strong>Planeta de Origen:</strong> {personaje.originPlanet.name}</p>}
      <p className="mt-2 text-lg font-medium">Precio: $100</p> {/* Mostrar precio ficticio */}
      <div className="flex space-x-4 mt-4">
        <button onClick={() => onMasInfo(personaje.id)} className={claseBoton}>+info</button>
        <button onClick={() => onAgregarAlCarrito(personaje)} className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600">
          🛒 Agregar
        </button>
      </div>
    </div>
  );
};

export default TarjetaPersonaje;
