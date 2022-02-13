import { createContext, useState, useMemo } from "react";

const PlayerContext = createContext({
  player: {},
  setPlayer: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({});
  const value = useMemo(() => ({ player, setPlayer }), [player]);
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export default PlayerContext;
