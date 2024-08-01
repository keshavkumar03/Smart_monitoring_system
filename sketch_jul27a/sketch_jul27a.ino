#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define DHTPIN 2 // Pin connected to DATA of DHT22
#define DHTTYPE DHT22  // DHT22 sensor

DHT dht(DHTPIN, DHTTYPE);

const int soilMoisturePin = A0; // For analog output

// WiFi and MQTT setup
const char* ssid = "Keshav";
const char* password = "Keshavkumar06";
const char* mqtt_server = "test.mosquitto.org"; // Updated to correct MQTT server
const char* topic = "testtopic/1";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Connect to WiFi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  // Set MQTT server
  client.setServer(mqtt_server, 1883); // Updated to correct MQTT WebSocket port
  connectToMQTT();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read DHT22 sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Check if sensor readings are valid
  if (isnan(temperature)) temperature = 0; // Replace NaN with 0 or another default value
  if (isnan(humidity)) humidity = 0; // Replace NaN with 0 or another default value

  // Read soil moisture sensor
  int soilMoisture = analogRead(soilMoisturePin);
  
  // Optionally, set a default value for soil moisture if necessary
  if (soilMoisture < 0) soilMoisture = 0;

  // Publish sensor data to MQTT
  String payload = "{" +
                    String("\"temperature\":") + String(temperature) + "," +
                    String("\"humidity\":") + String(humidity) + "," +
                    String("\"soilMoisture\":") + String(soilMoisture) +
                    "}";
  client.publish(topic, payload.c_str());

  Serial.println("Published: " + payload);

  delay(5000); // Adjust the delay as needed
}

void connectToMQTT() {
  Serial.print("Connecting to MQTT...");
  if (client.connect("ESP8266Client")) {
    Serial.println("Connected to MQTT");
  } else {
    Serial.print("Failed with state ");
    Serial.println(client.state());
    delay(2000);
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      float temperature = dht.readTemperature();
      float humidity = dht.readHumidity();

      // Check if sensor readings are valid
      if (isnan(temperature)) temperature = 0;
      if (isnan(humidity)) humidity = 0;

      // Read soil moisture sensor
      int soilMoisture = analogRead(soilMoisturePin);
      
      // Optionally, set a default value for soil moisture if necessary
      if (soilMoisture < 0) soilMoisture = 0;

      // Publish sensor data to MQTT
      String payload = "{" +
                        String("\"temperature\":") + String(temperature) + "," +
                        String("\"humidity\":") + String(humidity) + "," +
                        String("\"soilMoisture\":") + String(soilMoisture) +
                        "}";
      client.publish(topic, payload.c_str());

      // Once connected, publish an announcement...
      client.publish(topic, "{\"message\":\"hello world\"}");
      // ... and resubscribe
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
