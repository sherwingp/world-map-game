import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  let players = [];
  let location = "";

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

      socket.on("marked location", (locationdata) => {
        location = locationdata
        socket.broadcast.emit("marked location", location)
      })

      socket.on("new player", (newPlayer) => {
        const addPlayer = async () => {
          if (
            players.find((player) => player.id === newPlayer.id) === undefined
          ) {
            players.push({ ...newPlayer, socketId: id });
          }

          return players;
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
    });
  }
  res.end();
};

export default SocketHandler;
