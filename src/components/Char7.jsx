import React from 'react';
import { Line } from 'react-chartjs-2';

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

export const LineChart = ({ data }) => {
  // Aplicar el filtro a los datos (por ejemplo, los últimos 30 días)
  const filteredData = filterDataByDateRange(data, 30);

  // Asegurarse de que haya al menos un dato para evitar errores
  if (filteredData.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  // Construir los datos del gráfico con los datos filtrados
  const chartData = {
    labels: filteredData.map(item => item.fecha),
    datasets: [
      {
        label: 'Turbidez',
        data: filteredData.map(item => item.turbidez),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'pH',
        data: filteredData.map(item => item.ph),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
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
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10, // Limitar el número de etiquetas en el eje X
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
