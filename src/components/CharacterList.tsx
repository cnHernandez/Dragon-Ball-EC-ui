import React from 'react';
import { Character } from '../services/dragonBallApi';
import TarjetaPersonaje from './CharacterCard';

interface ListaPersonajesProps {
  personajes: Character[];
  onMasInfo: (characterId: number) => Promise<void>;
  onAgregarAlCarrito: (personaje: Character) => void;
  claseBoton: string;
}

// Componente para mostrar la lista de personajes
const ListaPersonajes: React.FC<ListaPersonajesProps> = ({ personajes, onMasInfo, onAgregarAlCarrito, claseBoton }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {personajes.map((personaje) => (
        <TarjetaPersonaje 
          key={personaje.id} 
          personaje={personaje} 
          onMasInfo={onMasInfo} 
          onAgregarAlCarrito={onAgregarAlCarrito} 
          claseBoton={claseBoton} 
        />
      ))}
    </div>
  );
};

export default ListaPersonajes;
