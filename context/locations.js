import React, { createContext, useState } from "react";

// Define the initial locations data
const initialLocations = [
  { id: 1, title: "Lawn", status: "Safe", armed: true },
  { id: 2, title: "Fence", status: "Safe", armed: true },
  { id: 3, title: "Home", status: "Safe", armed: true },
];

// Create a context
export const LocationsContext = createContext();

// Create a provider component
export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState(initialLocations);

  // Method to update status by id
  const updateStatus = (id, newStatus) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id ? { ...location, status: newStatus } : location
      )
    );
  };

  // Method to update armed status by id
  const updateArmedStatus = (id, newArmedStatus) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id ? { ...location, armed: newArmedStatus } : location
      )
    );
  };

  return (
    <LocationsContext.Provider
      value={{ locations, updateStatus, updateArmedStatus }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
