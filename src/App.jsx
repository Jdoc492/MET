import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "./firebaseConfig";
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path='/home' element={usuario ? <Home correoUsuario={usuario.email} /> : <Navigate to="/login" />} />
        <Route path='/login' element={!usuario ? <Login /> : <Navigate to="/home" />} />
        <Route path='/' element={<Navigate to={usuario ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
