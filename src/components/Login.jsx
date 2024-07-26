import React, { useState } from 'react';
import appFirebase from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Login = () => {
  const [error, setError] = useState(null);

  const functionAuth = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value; 
    const contraseña = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, correo, contraseña);
    } catch (error) {
      let errorMessage = "Error al intentar iniciar sesión. Por favor, verifica tus credenciales.";
    
      // Puedes personalizar el mensaje de error basado en el tipo de error
      if (error.code === "auth/user-not-found") {
        errorMessage = "El correo electrónico proporcionado no está registrado.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "La contraseña proporcionada es incorrecta.";
      }
    
      // Mostrar el mensaje de error al usuario
      setError(errorMessage);
    } 
  }
  
  return (
  <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-sm w-full relative">
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">MET</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-0 left-0 right-0 mt-4" role="alert">
          <strong className="font-bold">Error:</strong> <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.36 5.64a.75.75 0 011.06 1.06L11.06 10l4.36 4.36a.75.75 0 11-1.06 1.06L10 11.06l-4.36 4.36a.75.75 0 11-1.06-1.06L8.94 10 4.58 5.64a.75.75 0 111.06-1.06L10 8.94l4.36-4.36z"/></svg>
          </span>
        </div>
      )}
      <form onSubmit={functionAuth}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correo</label>
          <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black" placeholder="ejemplo@email.com" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</label>
          <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black" placeholder="Ingresa tu contraseña" required />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Entrar</button>
      </form>
    </div>
  </div>
  );
};

export default Login;
