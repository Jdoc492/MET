import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Registrando los elementos necesarios de Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const RadarChart = ({ data }) => {
  // Función para filtrar los datos por un rango de fechas
  const filterDataByDateRange = (data, days) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);

    return data.filter(item => {
      const itemDate = new Date(item.fecha);
      return itemDate >= pastDate && itemDate <= today;
    });
  };

  // Aplicar el filtro a los datos (por ejemplo, los últimos 30 días)
  const filteredData = filterDataByDateRange(data, 30);

  // Asegurarse de que haya al menos un dato para evitar errores
  if (filteredData.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  // Extraer etiquetas únicas para el radar chart
  const labels = Array.from(new Set([
    ...filteredData.map(item => item.fecha)
  ]));

  const chartData = {
    labels: labels, // Fechas como etiquetas
    datasets: [
      {
        label: 'Turbidez',
        data: labels.map(label => {
          const item = filteredData.find(data => data.fecha === label);
          return item ? item.turbidez : 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'pH',
        data: labels.map(label => {
          const item = filteredData.find(data => data.fecha === label);
          return item ? item.ph : 0;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};
