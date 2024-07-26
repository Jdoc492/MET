import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrando los elementos necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = ({ data }) => {
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
    labels: filteredData.map(item => item.fecha),
    datasets: [
      {
        label: 'Turbidez',
        data: filteredData.map(item => item.turbidez),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'pH',
        data: filteredData.map(item => item.ph),
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

  return <Bar data={chartData} options={options} />;
};
