import { Bubble } from 'react-chartjs-2';

export const BubbleChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Turbidez vs pH vs Volumen',
        data: data.map(item => ({ x: item.turbidez, y: item.ph, r: item.volumen })),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return <Bubble data={chartData} />;
};
