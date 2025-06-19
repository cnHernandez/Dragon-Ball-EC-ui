import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true'); // Guardar estado de autenticación
      navigate('/');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
   
      <form onSubmit={handleLogin} className="bg-black-800 p-8 rounded shadow-lg text-white w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-orange-600 mb-4 font-bold">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-black py-2 rounded hover:bg-orange-600 transition">
          Iniciar Sesión
        </button>
      </form>
    
  );
}

export default Login;
