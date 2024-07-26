// import React from 'react';
// import { VolumeChart } from './Char1';
// import { PieChart } from './Char3';
// import { BubbleChart } from './Char5';
// import { ScatterChart } from './Char6';
// import { LineChart } from './Char7';
// import { BarChart } from './Char8';
// import { RadarChart } from './Char9';
// import { InfoCard } from './InfoCard';
// import { Card } from '@tremor/react';
// import './Dashboard.css'; // Archivo de estilos CSS para el Dashboard

// const Dashboard = () => {
//   const data = [
//     { fecha: '2023-07-01', turbidez: 5, ph: 7.2, volumen: 10 },
//     { fecha: '2023-07-02', turbidez: 4, ph: 7.0, volumen: 20 },
//     { fecha: '2023-07-03', turbidez: 6, ph: 7.3, volumen: 15 },
//     { fecha: '2023-07-04', turbidez: 3, ph: 7.1, volumen: 18 },
//     { fecha: '2023-07-05', turbidez: 5, ph: 7.4, volumen: 12 },
//     { fecha: '2023-07-06', turbidez: 2, ph: 7.0, volumen: 25 },
//     { fecha: '2023-07-07', turbidez: 4, ph: 7.2, volumen: 22 },
//   ];

//   const today = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
//   const todayData = data.find(item => item.fecha === today) || {};

//   const avgTurbidez = (data.reduce((acc, item) => acc + item.turbidez, 0) / data.length).toFixed(2);
//   const avgPh = (data.reduce((acc, item) => acc + item.ph, 0) / data.length).toFixed(2);
//   const avgVolumen = (data.reduce((acc, item) => acc + item.volumen, 0) / data.length).toFixed(2);

//   const turbidezToday = todayData.turbidez || 'No disponible';
//   const phToday = todayData.ph || 'No disponible';
//   const volumenToday = todayData.volumen || 'No disponible';

//   return (
//     <div className="p-6 space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       <InfoCard title="Turbidez del Día" value={turbidezToday} description="Medida en NTU (Unidades Nefelométricas de Turbidez)" />
//         <InfoCard title="pH del Día" value={phToday} description="Nivel de pH del agua" />
//         <InfoCard title="Volumen del Día" value={volumenToday} description="Volumen del agua en litros" />
//         <InfoCard title="Turbidez Promedio" value={avgTurbidez} description="Medida en NTU (Unidades Nefelométricas de Turbidez)" />
//         <InfoCard title="pH Promedio" value={avgPh} description="Nivel de pH del agua" />
//         <InfoCard title="Volumen Promedio" value={avgVolumen} description="Volumen del agua en litros" />

//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         <div className="chart-item col-span-1 lg:col-span-2">
//           <BarChart data={data} />
//         </div>
//         <div className="chart-item">
//           <PieChart data={data} />
//         </div>
//         <div className="chart-item col-span-1 lg:col-span-2">
//           <VolumeChart data={data} />
//         </div>
//         <div className="chart-item">
//           <RadarChart data={data} />
//         </div>
//         <div className="chart-item col-span-1 lg:col-span-3">
//           <LineChart data={data} />
//         </div>
//         <div className="chart-item col-span-1 lg:col-span-3">
//           <ScatterChart data={data} />
//         </div>
//         <div className="chart-item col-span-1 lg:col-span-3">
//           <BubbleChart data={data} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import app from '../firebaseConfig'; // Importa la configuración de Firebase
import { getDatabase, ref, get } from 'firebase/database'; // Importa funciones de Firebase
import { VolumeChart } from './Char1';
import { PieChart } from './Char3';
import { BubbleChart } from './Char5';
import { ScatterChart } from './Char6';
import { LineChart } from './Char7';
import { BarChart } from './Char8';
import { RadarChart } from './Char9';
import { InfoCard } from './InfoCard';
import './Dashboard.css'; // Archivo de estilos CSS para el Dashboard

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db,"data"); // La ruta a tus datos en Firebase

    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const dataObject = snapshot.val();

        // Convierte el objeto en un array para facilitar el manejo
        const dataArray = Object.keys(dataObject).map(key => ({
          fecha: key,
          ...dataObject[key],
        }));

        setData(dataArray);
      } else {
        console.log('No hay datos disponibles.');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false); // Marca la carga como completa
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
  const todayData = data.find(item => item.fecha === today) || {};

  const avgTurbidez = (data.reduce((acc, item) => acc + item.turbidez, 0) / data.length).toFixed(2);
  const avgPh = (data.reduce((acc, item) => acc + item.ph, 0) / data.length).toFixed(2);
  const avgVolumen = (data.reduce((acc, item) => acc + item.volumen, 0) / data.length).toFixed(2);

  const turbidezToday = todayData.turbidez || 'No disponible';
  const phToday = todayData.ph || 'No disponible';
  const volumenToday = todayData.volumen || 'No disponible';

  return (
    <div className="p-6 space-y-6">
      {loading && <p>Cargando datos...</p>}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <InfoCard title="Turbidez del Día" value={turbidezToday} description="Medida en NTU (Unidades Nefelométricas de Turbidez)" />
            <InfoCard title="pH del Día" value={phToday} description="Nivel de pH del agua" />
            <InfoCard title="Volumen del Día" value={volumenToday} description="Volumen del agua en litros" />
            <InfoCard title="Turbidez Promedio" value={avgTurbidez} description="Medida en NTU (Unidades Nefelométricas de Turbidez)" />
            <InfoCard title="pH Promedio" value={avgPh} description="Nivel de pH del agua" />
            <InfoCard title="Volumen Promedio" value={avgVolumen} description="Volumen del agua en litros" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="chart-item col-span-1 lg:col-span-2">
              <BarChart data={data} />
            </div>
            <div className="chart-item">
              <PieChart data={data} />
            </div>
            <div className="chart-item col-span-1 lg:col-span-2">
              <VolumeChart data={data} />
            </div>
            <div className="chart-item">
              <RadarChart data={data} />
            </div>
            <div className="chart-item col-span-1 lg:col-span-3">
              <LineChart data={data} />
            </div>
            <div className="chart-item col-span-1 lg:col-span-3">
              <ScatterChart data={data} />
            </div>
            <div className="chart-item col-span-1 lg:col-span-3">
              <BubbleChart data={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
