import React from 'react';
import { Transformation } from '../services/dragonBallApi';
import fondoGrisImg from '../assets/fondo-gris.jpeg'; // Importar la imagen de fondo

interface TarjetaTransformacionProps {
  transformacion: Transformation;
}

// Componente para mostrar la tarjeta de una transformación
const TarjetaTransformacion: React.FC<TarjetaTransformacionProps> = ({ transformacion }) => {
  return (
    <div
      className="border rounded shadow p-4 text-white transition-transform transform hover:scale-105"
      style={{ backgroundImage: `url(${fondoGrisImg})`, backgroundSize: 'cover' }} // Establecer imagen de fondo
    >
      <h4 className="text-xl font-semibold">{transformacion.name}</h4>
      <img src={transformacion.image} alt={transformacion.name} className="w-full h-auto max-h-64 object-contain transition-transform transform hover:scale-110" />
      <p><strong>Ki:</strong> {transformacion.ki}</p>
    </div>
  );
};

export default TarjetaTransformacion;
