import { createContext, useState, useMemo } from "react";

const NameContext = createContext({
  name: "",
  setName: () => {},
});

export const NameProvider = ({ children }) => {
  const [name, setName] = useState("");
  const value = useMemo(() => ({ name, setName }), [name]);
  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
};

export default NameContext;
