import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  let players = [];

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      const id = socket.id;

      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log(`a user disconnected (id: ${socket.id})`);
        const player = players.find((player) => player.socketId === socket.id);
        players = players.filter((player) => player.socketId !== socket.id);
        if (player !== undefined) {
          io.emit("player left", player.name);
        }
      });

      socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
      });

      socket.on("marked location", ({ location, mode }) => {
        console.log(mode);
        socket.broadcast.emit("marked location", { location, mode });
      });

      socket.on("new player", (newPlayer) => {
        const addPlayer = async () => {
          if (
            players.find((player) => player.id === newPlayer.id) === undefined
          ) {
            if (players.find((player) => player.host) === true) {
              newPlayer.host = false;
              players.push({ ...newPlayer, socketId: id });
            } else {
              players.push({ ...newPlayer, socketId: id });
            }
            return players;
          }
        };

        const sendPlayer = async () => {
          const newPlayers = await addPlayer();

          console.log(newPlayers);

          io.emit("new player return", newPlayers);
          io.emit("player joined", newPlayer.name);
        };

        sendPlayer();
      });

      socket.on("refresh players", () => {
        io.emit("refresh players", players);
      });

      socket.on("send score", (updatedPlayers) => {
        players = updatedPlayers;
        console.log(players);
        socket.broadcast.emit("refresh players", players);
      });

      socket.on("set mode", (mode) => {
        console.log(`mode sent ${mode}`);
        socket.emit("set mode", mode);
      });
    });
  }
  res.end();
};

export default SocketHandler;
