import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as 'index', // Explicitly type 'mode' as 'index'
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Price (USD)',
      },
    },
  },
};


interface DataSet {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface ChartData {
  labels: string[];
  datasets: DataSet[];
}

const EthereumPriceChart: React.FC = () => {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Ethereum Price',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    // Here you should fetch the real-time Ethereum price and update the chart data
    // For demonstration, we're adding dummy data points every second
    const interval = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, Math.random() * 1000 + 1000], // Replace with real data
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Line options={options} data={data} />;
};

export default EthereumPriceChart;
