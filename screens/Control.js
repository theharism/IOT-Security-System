import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import ArmDisarmButton from "../components/ArmDisarmButton";
import SensorStatus from "../components/SensorStatus";
import StopAlarmButton from "../components/StopAlarmButton";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";
import { LocationsContext } from "../context/locations";
import { ActivitiesContext } from "../context/activities";
import useMqttClient from "../hooks/mqttClient";

// init({
//   size: 10000,
//   storageBackend: AsyncStorage,
//   defaultExpires: 1000 * 3600 * 24,
//   enableCache: true,
//   sync: {},
// });
// const options = {
//   host: "w8ee1d1e.ala.dedicated.aws.emqxcloud.com",
//   port: 8083,
//   path: "/mqtt",
//   id: "id_" + parseInt(Math.random() * 100000),
// };
// const client = new Paho.MQTT.Client(options.host, options.port, options.path);

const Control = () => {
  const [alarmActive, setAlarmActive] = useState(true);
  const [armed, setArmed] = useState(false);
  const [stop, setStop] = useState(false);
  const [controlMessage, setControlMessage] = useState("");
  const client = useMqttClient();
  const { locations, updateArmedStatus, updateStatus, handleArmedStatusSet } =
    useContext(LocationsContext);
  const { addActivity } = useContext(ActivitiesContext);

  useEffect(() => {
    if (client) {
      const msg = locations.reduce((msg, location, index) => {
        if (location.armed) {
          msg += location.title;
        } else {
          msg += "null";
        }
        if (index !== locations.length - 1) {
          msg += ",";
        }

        return msg;
      }, "");
      console.log(msg, controlMessage);
      if (msg !== controlMessage) {
        setControlMessage(msg);

        message = new Paho.MQTT.Message(msg);
        message.destinationName = "Home/Control";
        message.retained = true;
        client.send(message);
        console.log("noooooo", msg, controlMessage);
      }
    }
  }, [locations]);

  const onMessageArrived = (message) => {
    console.log(
      "onMessageArrived:" + message.destinationName + message.payloadString
    );
    if (message.destinationName === "Home/Control") {
      setControlMessage(message.payloadString);
      if (message.payloadString === "null,null,null") {
        setArmed(false);
      } else {
        setArmed(true);
      }
      handleArmedStatusSet(message.payloadString);
      return;
    }
    const location = message.destinationName.split("/")[1];
    updateStatus(location, "UnSafe");
    const randomId = Math.floor(Math.random() * 1000000);
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", { timeZone: "UTC" });

    addActivity({
      id: randomId,
      title: message.destinationName.split("/")[1],
      time: formattedTime,
    });
  };

  const onMessageDelivered = (message) => {
    if (message.destinationName === "Home/Control") {
      if (message.payloadString === "null,null,null") {
        setArmed(false);
      } else {
        setArmed(true);
      }
    }
  };

  const onConnectionLost = (err) => {
    // console.error("NOT CONNECTED", err);
    ToastAndroid.show(err.errorMessage, ToastAndroid.LONG);
  };

  // useEffect(() => {
  //   client.connect({
  //     useSSL: false,
  //     timeout: 30,
  //     userName: "temp",
  //     password: "12345678",
  //     onSuccess: subscribeControl,
  //     onFailure: (err) => console.log("NOT CONNECTED", err),
  //     reconnect: true,
  //   });
  // }, []);
  // if (client) {
  //   client.onConnectionLost = onConnectionLost;
  //   client.onMessageArrived = onMessageArrived;
  //   client.onMessageDelivered = onMessageDelivered;
  // }
  useEffect(() => {
    if (client) {
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;
      client.onMessageDelivered = onMessageDelivered;
    }
  }, [client]);

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
    let message;
    if (armed) {
      locations.forEach((location) => updateArmedStatus(location.id, false));
      // setArmed(false);
      // message = new Paho.MQTT.Message("null,null,null");
    } else {
      locations.forEach((location) => updateArmedStatus(location.id, true));
      // setArmed(true);

      // message = new Paho.MQTT.Message("Lawn,Fence,Home");
    }
    // message.destinationName = "Home/Control";
    // message.retained = true;
    // client.send(message);
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
        <Text style={{ fontWeight: "400", fontSize: 36, color: "black" }}>
          {client.isConnected() ? "Connected" : "Not Connected"}
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
