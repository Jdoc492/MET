import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrando los elementos necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const VolumeChart = ({ data }) => {
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

  const chartData = {
    labels: filteredData.map(item => item.fecha), // Fechas de los datos
    datasets: [
      {
        label: 'Volumen de Agua (L)',
        data: filteredData.map(item => item.volumen),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} L`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
