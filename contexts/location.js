import { createContext, useState, useMemo } from "react";

const LocationContext = createContext({
  location: "",
  setLocation: () => {},
});

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const value = useMemo(() => ({ location, setLocation }), [location]);
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export default LocationContext;