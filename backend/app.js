const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sensor_data');
const sensorSchema = new mongoose.Schema({
  temperature: Number,
  moisture: Number,
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', sensorSchema);

// MQTT Client setup
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org');

mqttClient.on('connect', () => {
  mqttClient.subscribe('testtopic/1', (err) => {
    if (!err) {
      console.log('Subscribed to sensor/data topic');
    }
  });
});

mqttClient.on('message', async (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  
  try {
    const sensorData = JSON.parse(message.toString());
    const newSensorData = new SensorData(sensorData);
    await newSensorData.save(); // Use await for saving
    console.log('Sensor data saved:', sensorData);
  } catch (error) {
    console.error('Error saving sensor data:', error);
  }
});

// API to get sensor data
app.get('/data', async (req, res) => {
  const data = await SensorData.find().sort({ timestamp: -1 }).limit(10);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
