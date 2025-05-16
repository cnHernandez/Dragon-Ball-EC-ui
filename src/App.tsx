import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Character } from './services/dragonBallApi';
import { Planet } from './services/dragonBallApi';
import PaginaPlanetas from './pages/PaginaPlanetas';
import PaginaPersonajes from './pages/PaginaPersonajes';
import PaginaCarrito from './pages/PaginaCarrito';
import PaginaPersonajeDetalle from './pages/PaginaPersonajeDetalle';

import personajesImg from './assets/personajes.jpg';
import planetasImg from './assets/planetas1.jpg';
import logo from './assets/Dragon_Ball_Logo_PNG1.png';

function App() {
  const [carritoPersonajes, setCarritoPersonajes] = useState<Character[]>([]); // Carrito para personajes
  const [carritoPlanetas, setCarritoPlanetas] = useState<Planet[]>([]); // Carrito para planetas
  const claseBotonImagen = "w-80 h-80 rounded-full border-4 border-transparent hover:border-orange-500 transition-transform transform hover:scale-110";

  const eliminarPersonaje = (id: number) => {
    setCarritoPersonajes((prevCarrito) => prevCarrito.filter((personaje) => personaje.id !== id));
  };

  const eliminarPlaneta = (id: number) => {
    setCarritoPlanetas((prevCarrito) => prevCarrito.filter((planeta) => planeta.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center p-8 text-center bg-black text-orange-500 relative font-sans">
        <nav className="fixed top-0 right-0 left-0 flex items-center justify-between bg-black text-orange-500 px-4 py-2 shadow-lg z-50 border-b-4 border-orange-500">
          <Link to="/" className="text-lg font-medium hover:underline">Inicio</Link>
          <img 
            src={logo} 
            alt="Dragon Ball Logo" 
            className="w-32 h-auto mx-auto" // Centrar el logo
          />
          <Link to="/carrito" className="relative flex items-center">
            🛒 {/* Emoji de carrito */}
            {(carritoPersonajes.length + carritoPlanetas.length) > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {carritoPersonajes.length + carritoPlanetas.length} {/* Contador total */}
              </span>
            )}
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center">
              <nav className="flex space-x-8">
                <div className="flex flex-col items-center">
                  <Link to="/pagina-personajes">
                    <img src={personajesImg} alt="Personajes" className={claseBotonImagen} />
                  </Link>
                  <span className="mt-2 text-lg font-medium">Personajes</span>
                </div>
                <div className="flex flex-col items-center">
                  <Link to="/pagina-planetas">
                    <img src={planetasImg} alt="Planetas" className={claseBotonImagen} />
                  </Link>
                  <span className="mt-2 text-lg font-medium">Planetas</span>
                </div>
              </nav>
            </div>
          } />
          <Route
            path="/pagina-planetas"
            element={
              <PaginaPlanetas
                carrito={carritoPlanetas}
                setCarrito={setCarritoPlanetas}
              />
            }
          />
          <Route
            path="/pagina-personajes"
            element={
              <PaginaPersonajes
                carrito={carritoPersonajes}
                setCarrito={setCarritoPersonajes}
              />
            }
          />
          <Route
            path="/carrito"
            element={
              <PaginaCarrito
                carritoPersonajes={carritoPersonajes}
                carritoPlanetas={carritoPlanetas}
                eliminarPersonaje={eliminarPersonaje}
                eliminarPlaneta={eliminarPlaneta}
              />
            }
          />
          <Route path="/personaje/:id" element={<PaginaPersonajeDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




