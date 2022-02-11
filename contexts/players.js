import { createContext, useState, useMemo } from "react";

const PlayersContext = createContext({
  players: [],
  setPlayers: () => {},
});

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const value = useMemo(() => ({ players, setPlayers }), [players]);
  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
};

export default PlayersContext;
