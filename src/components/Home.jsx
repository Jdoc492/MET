import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Read from './Read';
import Dashboard from './Dashboard';

const auth = getAuth(appFirebase);

const Home = () => {
  const navigate = useNavigate(); // Añade esta línea para usar el hook useNavigate

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Barra de navegación */}
      <nav className="bg-gray-800 shadow">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-white text-lg font-semibold">Panel Administrativo</span>
            </div>
            <div className="flex items-center">
              <button onClick={handleSignOut} className="text-white focus:outline-none mx-4 hover:text-gray-300">Salir</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Bienvenido al Panel Administrativo</h1>
          <div className=" p-6 rounded-lg shadow-md">
            <p className="text-lg">¡Hola! ¿Cómo estás hoy?</p>
            {/* <Read/> */}
            <Dashboard/>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="container mx-auto">
          <p>&copy; 2024 Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
