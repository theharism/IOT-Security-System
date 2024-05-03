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
import { ActivitiesContext } from "../context/activities";

const Activities = () => {
  const { activities } = useContext(ActivitiesContext);

  const Activity = ({ title, time }) => {
    return (
      <View
        style={{
          width: "98%",
          margin: "1%",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: "#e93457",
          borderRadius: 10,
        }}
      >
        <MaterialIcons
          name="location-pin"
          size={30}
          color={"#ccc"}
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingLeft: 5,
              color: "white",
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "white",
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Intrusion Activities</Text>

      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <Activity id={item.id} title={item.title} time={item.time} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20, width: "100%" }}
      />
    </SafeAreaView>
  );
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColorg: "#F6F6F6",
    padding: 14,
    paddingTop: 70,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
});
