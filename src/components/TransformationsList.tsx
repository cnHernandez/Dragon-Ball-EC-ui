import React from 'react';
import { Transformation } from '../services/dragonBallApi';
import TarjetaTransformacion from './TransformationCard';

interface ListaTransformacionesProps {
  transformaciones: Transformation[];
}

// Componente para mostrar la lista de transformaciones
const ListaTransformaciones: React.FC<ListaTransformacionesProps> = ({ transformaciones }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {transformaciones.map((transformacion) => (
        <TarjetaTransformacion key={transformacion.id} transformacion={transformacion} />
      ))}
    </div>
  );
};

export default ListaTransformaciones;
