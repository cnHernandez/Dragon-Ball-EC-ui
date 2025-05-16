import React from 'react';
import { Transformation } from '../services/dragonBallApi';

interface TarjetaTransformacionProps {
  transformacion: Transformation;
}

// Componente para mostrar la tarjeta de una transformación
const TarjetaTransformacion: React.FC<TarjetaTransformacionProps> = ({ transformacion }) => {
  return (
    <div className="border rounded shadow p-4 bg-gray-800 text-white transition-transform transform hover:scale-105">
      <h4 className="text-xl font-semibold">{transformacion.name}</h4>
      <img src={transformacion.image} alt={transformacion.name} className="w-full h-auto max-h-64 object-contain transition-transform transform hover:scale-110" />
      <p><strong>Ki:</strong> {transformacion.ki}</p>
    </div>
  );
};

export default TarjetaTransformacion;
