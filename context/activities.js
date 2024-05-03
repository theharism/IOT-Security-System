import React, { createContext, useState } from "react";

// Define the initial activities data
const initialActivities = [
  { id: 1, title: "Lawn", time: "4576" },
  { id: 2, title: "Fence", time: "4576" },
  { id: 3, title: "Home", time: "4576" },
];

// Create a context
export const ActivitiesContext = createContext();

// Create a provider component
export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  // Method to add a new activity
  const addActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  return (
    <ActivitiesContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
