import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";

// Initialize storage
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

// MQTT options
const options = {
  host: "w8ee1d1e.ala.dedicated.aws.emqxcloud.com",
  port: 8083,
  path: "/mqtt",
  id: "id_" + parseInt(Math.random() * 100000),
};

const useMqttClient = () => {
  const [mqttClient, setMqttClient] = useState(null);

  useEffect(() => {
    const client = new Paho.MQTT.Client(
      options.host,
      options.port,
      options.path,
      options.id
    );

    const onConnect = () => {
      console.log("CONNECTED");
      client.subscribe("Home/Fence", {
        qos: 0,
        onSuccess: () => console.log("SUBSCRIBED Fence"),
        onFailure: () => console.log("NOT SUBSCRIBED Fence"),
      });
      client.subscribe("Home/Lawn", {
        qos: 0,
        onSuccess: () => console.log("SUBSCRIBED Lawn"),
        onFailure: () => console.log("NOT SUBSCRIBED Lawn"),
      });
      client.subscribe("Home/Inside", {
        qos: 0,
        onSuccess: () => console.log("SUBSCRIBED Inside"),
        onFailure: () => console.log("NOT SUBSCRIBED Inside"),
      });
      client.subscribe("Home/Control", {
        qos: 0,
        onSuccess: () => {
          console.log("SUBSCRIBED Control");
        },
        onFailure: () => console.log("NOT SUBSCRIBED Control"),
      });
    };

    client.connect({
      useSSL: false,
      timeout: 3,
      userName: "temp",
      password: "12345678",
      onSuccess: onConnect,
      onFailure: (err) => {
        console.log("NOT CONNECTED", err);
        ToastAndroid.show(err.errorMessage, ToastAndroid.LONG);
      },
      cleanSession: false,
    });

    setMqttClient(client);

    return () => {
      // Disconnect MQTT client when component unmounts
      client.disconnect();
    };
  }, []);

  return mqttClient;
};

export default useMqttClient;
