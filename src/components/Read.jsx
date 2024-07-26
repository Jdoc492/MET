import React, { useState, useEffect } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { CardUsageExample } from "./Card";
import {ListUsageExample} from "./List";
import { Card } from '@tremor/react';

function Read() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [registroArray, setRegistroArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = getDatabase(app);
    const estacionRef = ref(db, "estaciones/estacion1/lecturas");

    try {
      const snapshot = await get(estacionRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fechaActual = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato "YYYY-MM-DD"
        
        // Filtrar los registros por la fecha actual
        const registrosHoy = Object.keys(data)
          .filter(key => key.startsWith(fechaActual))
          .map(key => ({
            id: key,
            ...data[key]
          }));
        
        setRegistroArray(registrosHoy);
      } else {
        console.log("No hay datos disponibles.");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      alert("Error al obtener datos.");
    } finally {
      setLoading(false); // Marca la carga como completa, ya sea éxito o error
    }
  }



  const data = [
    { fecha: '2023-07-01', volumen: 15 },
    { fecha: '2023-07-02', volumen: 20 },
    { fecha: '2023-07-03', volumen: 18 },
    { fecha: '2023-07-04', volumen: 25 },
    { fecha: '2023-07-05', volumen: 22 },
    { fecha: '2023-07-06', volumen: 30 },
    { fecha: '2023-07-07', volumen: 28 },
  ];

  return (
    <div className='container mx-auto pt-10'>
      {loading && <p>Cargando datos...</p>}
      {registroArray.map((registro, index) => (
        <div key={index} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <CardUsageExample titulo="Dirección del viento" valor={registro.direccionViento}/>
          <CardUsageExample titulo="Velocidad viento" valor={registro.velocidadViento}/>
          <CardUsageExample titulo="Precipitación" valor={registro.precipitacion}/>
          <CardUsageExample titulo="Presión" valor={registro.presion}/>
          <CardUsageExample titulo="Temperatura" valor={registro.temperatura}/>
          <CardUsageExample titulo="Humedad" valor={registro.humedad}/>
          <CardUsageExample titulo="Índice de Calor" valor={registro.indiceCalor}/>
          <CardUsageExample titulo="Índice UV" valor={registro.indiceuv}/>
        </div>
      ))}

          {/* Sección de lista de ejemplo y gráfico de área */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10'>
            <div className="sm:col-span-2 px-4">
              <ListUsageExample />
            </div>
            <div className="sm:col-span-2 px-4">
              <Card>
                <VolumeChart data={data} />
              </Card>
              <Card>
                <QualityChart />
              </Card>
              <Card>
                <PieChart />
              </Card>
              <Card>
                <AreaChart />
              </Card>
              
            </div>
          </div>
        

    </div>
  );
}

export default Read;
