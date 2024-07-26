
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MET/', // Reemplaza 'nombre-de-tu-repositorio' con el nombre real de tu repositorio
  plugins: [react()],
});

