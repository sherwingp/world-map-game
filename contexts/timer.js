import { createContext, useState, useMemo } from "react";

const TimerContext = createContext({
  timer: {},
  setTimer: () => {},
});

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState({});
  const value = useMemo(() => ({ timer, setTimer }), [timer]);
  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export default TimerContext;
