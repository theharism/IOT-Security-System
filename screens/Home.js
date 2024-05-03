import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LocationsContext } from "../context/locations";

const Home = () => {
  const { locations, updateArmedStatus } = useContext(LocationsContext);

  const handleArmedStatusUpdate = (id, newArmedStatus) => {
    console.log(id, newArmedStatus);
    updateArmedStatus(id, newArmedStatus);
  };

  const Location = ({ id, title, status, armed }) => {
    return (
      <TouchableOpacity
        style={{
          width: "48%",
          margin: "1%",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: status === "Safe" ? "#dfdfdf" : "red",
          borderRadius: 10,
        }}
        onPress={() => handleArmedStatusUpdate(id, !armed)}
      >
        <MaterialIcons
          name="location-pin"
          size={30}
          color={status === "Safe" ? "gray" : "black"}
          style={{ paddingVertical: 5 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingVertical: 5,
          }}
        >
          <View style={{ paddingLeft: 5 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: status === "Safe" ? "black" : "white",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: status === "Safe" ? "green" : "black",
              }}
            >
              {status}
            </Text>
          </View>

          <FontAwesome
            name="power-off"
            size={20}
            color={armed ? "green" : "red"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const systemStatus = locations.every(
    (location) => location.status === "Safe"
  ) ? (
    <Text style={styles.heading}>
      System Status:{" "}
      <Text style={{ color: "green", fontWeight: "bold" }}>All Good</Text>
    </Text>
  ) : (
    <Text style={styles.heading}>
      System Status:{" "}
      <Text style={{ color: "red", fontWeight: "bold" }}>INSECURE</Text>
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {systemStatus}
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <Location
            id={item.id}
            title={item.title}
            status={item.status}
            armed={item.armed}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20, width: "100%" }}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColorg: "#F6F6F6",
    padding: 14,
    paddingTop: 70,
  },
  heading: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 20,
  },
});
