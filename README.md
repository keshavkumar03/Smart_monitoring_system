# Smart Monitoring System

## Overview

The Smart Monitoring System is a project designed to monitor environmental conditions using sensors and publish the data to an MQTT broker. This system utilizes an ESP8266 microcontroller to interface with a DHT22 temperature and humidity sensor and a soil moisture sensor. The collected data is published to an MQTT topic and stored in a MongoDB database.

## Components

- **ESP8266**: Microcontroller for interfacing with sensors and MQTT broker.
- **DHT22 (AM2302)**: Temperature and humidity sensor.
- **Soil Moisture Sensor**: Measures soil moisture level.
- **MongoDB**: Database for storing sensor data.
- **MQTT Broker**: Handles the publication and subscription of sensor data.

## Features

- Reads temperature, humidity, and soil moisture data from sensors.
- Publishes sensor data to an MQTT broker.
- Saves sensor data to a MongoDB database.
- Real-time monitoring and data storage.

## Installation

### 1. Hardware Setup

1. **Connect the DHT22 Sensor:**
   - **VCC**: Connect to 3.3V on the ESP8266.
   - **GND**: Connect to GND on the ESP8266.
   - **DATA**: Connect to a digital I/O pin (e.g., D4/GPIO2).

2. **Connect the Soil Moisture Sensor:**
   - **VCC**: Connect to 3.3V on the ESP8266.
   - **GND**: Connect to GND on the ESP8266.
   - **AOUT**: Connect to an analog input pin (e.g., A0/GPIO17).

### 2. Software Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/smart-monitoring-system.git
   cd smart-monitoring-system
Install Dependencies:

Backend:
bash
Copy code
cd backend
npm install
Configure the ESP8266:

Update the WiFi and MQTT server details in the Arduino sketch (esp8266_code.ino).
Upload the Code:

Use the Arduino IDE to upload the code to the ESP8266.
Run the Backend Server:

bash
Copy code
cd backend
node app.js
Usage
Deploy the Hardware:

Ensure the ESP8266 is connected to the WiFi and MQTT broker.
Run the Backend:

Start the backend server to receive and store data:
bash
Copy code
node app.js
Monitor Data:

The backend server will log received sensor data and store it in the MongoDB database.
Troubleshooting
No Data Received:

Check the ESP8266 connections and ensure it is connected to the WiFi.
Verify MQTT broker connectivity and topic subscription.
Sensor Values Incorrect:

Ensure the sensor wiring is correct and the sensors are functioning properly.
Contributing
Feel free to open issues or submit pull requests if you find any bugs or want to add new features.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or support, please contact your email address.

markdown
Copy code

### Notes:
- Replace `https://github.com/yourusername/smart-monitoring-system.git` with the actual URL of your GitHub repository.
- Update the file paths and instructions according to your actual project structure.
- Ensure that the `app.js` file and Arduino sketch (`esp8266_code.ino`) are included in your repository with correct configurations.

Feel free to adjust any sections as needed for your specific project details!





