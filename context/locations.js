import React, { createContext, useState } from "react";

// Define the initial locations data
const initialLocations = [
  { id: 1, title: "Lawn", status: "Safe", armed: false },
  { id: 2, title: "Fence", status: "Safe", armed: false },
  { id: 3, title: "Inside", status: "Safe", armed: false },
];

// Create a context
export const LocationsContext = createContext();

// Create a provider component
export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState(initialLocations);

  // Method to update status by id
  const updateStatus = (title, newStatus) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.title === title ? { ...location, status: newStatus } : location
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

  const handleArmedStatusSet = (msg) => {
    const msgArray = msg.split(",");
    // locations.forEach((location) => {
    //   if (msgArray.includes(location.title)) {
    //     updateArmedStatus(location.id, true);
    //   } else {
    //     updateArmedStatus(location.id, false);
    //   }
    // });
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        msgArray.includes(location.title)
          ? { ...location, armed: true }
          : { ...location, armed: false }
      )
    );
  };

  return (
    <LocationsContext.Provider
      value={{
        locations,
        updateStatus,
        updateArmedStatus,
        handleArmedStatusSet,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
