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
        io.emit("player left", player.name);
      });

      socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
      });

      socket.on("new player", (newPlayer) => {
        if (
          players.find((player) => player.id === newPlayer.id) === undefined
        ) {
          players.push({ ...newPlayer, socketId: id });
        }

        io.emit("new player", players, newPlayer);
        io.emit("player joined", newPlayer.name);
      });

      socket.on("refresh players", () => {
        io.emit("refresh players", players);
      });
    });
  }
  res.end();
};

export default SocketHandler;
