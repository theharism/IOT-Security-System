import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ArmDisarmButton from "../components/ArmDisarmButton";
import SensorStatus from "../components/SensorStatus";
import StopAlarmButton from "../components/StopAlarmButton";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});
const options = {
  host: "w8ee1d1e.ala.dedicated.aws.emqxcloud.com",
  port: 8083,
  path: "/",
  id: "id_" + parseInt(Math.random() * 100000),
};
const client = new Paho.MQTT.Client(options.host, options.port, options.path);

const Control = () => {
  const [alarmActive, setAlarmActive] = useState(true);
  const [armed, setArmed] = useState(false);
  const [stop, setStop] = useState(false);
  const subscribeControl = () => {
    client.subscribe("Home/fence", {
      qos: 0,
      onSuccess: () => console.log("SUBSCRIBED"),
      onFailure: () => console.log("NOT SUBSCRIBED"),
    });
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "Home/fence";
    client.send(message);
  };

  const onMessageArrived = (message) => {
    console.log("onMessageArrived:" + message.payloadString);
  };

  client.connect({
    useSSL: false,
    timeout: 3,
    userName: "temp",
    password: "12345678",
    onSuccess: subscribeControl,
    onFailure: (err) => console.log("NOT CONNECTED", err),
    reconnect: true,
  });
  client.onMessageArrived = onMessageArrived;

  const handleStopAlarm = () => {
    // Add logic to stop the alarm
    setAlarmActive(false);
    setStop(true);
  };

  const handleStartAlarm = () => {
    //Logic to make make alarm true
    setAlarmActive(true);
  };

  const handleArmDisarm = () => {
    setArmed(!armed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>SecureME</Text>
      {/* <ArmDisarmButton onArmDisarm={handleArmDisarm} armed={armed} /> */}
      <TouchableOpacity onPress={handleArmDisarm}>
        <FontAwesome
          name="power-off"
          size={140}
          color={armed ? "green" : "red"}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "100", fontSize: 24 }}>CURRENTLY</Text>
        <Text style={{ fontWeight: "400", fontSize: 36, color: "black" }}>
          {armed ? "ARMED" : "UN-ARMED"}
        </Text>
      </View>
      {/* <SensorStatus sensor="Fence" status={armed ? "Safe" : "Safe"} />
      <SensorStatus sensor="Window" status={armed ? "Safe" : "Safe"} />
      <SensorStatus sensor="Door" status={armed ? "Safe" : "Safe"} />
      <SensorStatus
        sensor="Lawn Motion Sensor"
        status={armed ? "Safe" : "Safe"}
      />
      <SensorStatus
        sensor="Inside House Sensor"
        status={armed ? "Intruder Alert" : "Safe"}
        setAlarmStatus={handleStartAlarm}
        stopAlarm={stop}
      />
      {alarmActive && <StopAlarmButton onPress={handleStopAlarm} />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F6F6F6",
  },
  heading: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Control;
