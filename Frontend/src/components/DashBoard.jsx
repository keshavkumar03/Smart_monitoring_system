// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const DashBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = {
    labels: data.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature',
        data: data.map(entry => entry.temperature),
        borderColor: 'rgba(75,192,192,1)',
        fill: false
      },
      {
        label: 'Moisture',
        data: data.map(entry => entry.moisture),
        borderColor: 'rgba(153,102,255,1)',
        fill: false
      }
    ]
  };

  return (
    <div>
      <h2>Sensor Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DashBoard;
