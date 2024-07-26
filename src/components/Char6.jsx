import { Scatter } from 'react-chartjs-2';

export const ScatterChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Turbidez vs pH',
        data: data.map(item => ({ x: item.turbidez, y: item.ph })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Scatter data={chartData} />;
};
