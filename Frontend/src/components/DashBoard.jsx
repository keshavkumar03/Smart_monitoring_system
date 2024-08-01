import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    axios.get('http://localhost:3000/data')
      .then(response => {
        console.log('Data fetched:', response.data); // Add this line
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    console.log('Loading data...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('Error:', error.message);
    return <div>Error: {error.message}</div>;
  }

  const chartData = {
    labels: data.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Soil Moisture',
        data: data.map(entry => entry.moisture),
        borderColor: 'rgba(153,102,255,1)',
        fill: false
      }
    ]
  };

  console.log('Rendering chart with data:', chartData);

  return (
    <div className="chart-container">
      <h2>Sensor Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DashBoard;
