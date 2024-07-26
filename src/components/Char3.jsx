import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrando los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ data }) => {
  // Sumando todos los valores de turbidez y pH
  const totalTurbidez = data.reduce((acc, item) => acc + item.turbidez, 0);
  const totalPh = data.reduce((acc, item) => acc + item.ph, 0);

  const chartData = {
    labels: ['Turbidez', 'pH'],
    datasets: [
      {
        label: 'Distribución de Parámetros',
        data: [totalTurbidez, totalPh],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};
