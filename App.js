import * as mqtt from "mqtt/dist/mqtt.min";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Control from "./screens/Control";
import Activities from "./screens/Activity";
import Home from "./screens/Home";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import { Text } from "react-native";
import { LocationsProvider } from "./context/locations";
import { ActivitiesProvider } from "./context/activities";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Control"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 55 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={26}
              color={focused ? "black" : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontWeight: focused ? "bold" : "normal", fontSize: 14 }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Control"
        component={Control}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="security"
              size={26}
              color={focused ? "black" : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontWeight: focused ? "bold" : "normal", fontSize: 14 }}
            >
              Control
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activities}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="activity"
              size={26}
              color={focused ? "black" : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontWeight: focused ? "bold" : "normal", fontSize: 14 }}
            >
              Activity
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <ActivitiesProvider>
        <LocationsProvider>
          <AppStack />
        </LocationsProvider>
      </ActivitiesProvider>
    </NavigationContainer>
  );
}
