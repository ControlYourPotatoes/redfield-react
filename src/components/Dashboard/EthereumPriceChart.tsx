import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time',
        color: 'black', // X-axis title color
      },
      ticks: {
        color: 'black', // X-axis ticks color
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)', // X-axis grid line color
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Price (USD)',
        color: 'black', // Y-axis title color
      },
      ticks: {
        color: 'black', // Y-axis ticks color
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)', // Y-axis grid line color
      },
    },
  },
};

const EthereumPriceChart: React.FC = () => {
  const [data, setData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'Ethereum Price',
        data: [],
        borderColor: 'black', // Line color
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fill color
      },
    ],
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      // This is a placeholder. In a real app, replace this with actual data fetching
      const newData = Math.random() * 1000 + 1000;
      
      setData((prevData) => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: [...dataset.data, newData],
        })),
      }));
    };

    const interval = setInterval(fetchPriceData, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return <Line options={options} data={data} />;
};

export default EthereumPriceChart;
