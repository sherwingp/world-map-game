import { Server } from "Socket.IO";

const SocketHandler = (req, res) => {
  const players = [];

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("a user disconnected");
      });

      socket.on("leave server", () => {
        console.log("testing");
      });

      socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
      });

      socket.on("new player", (player) => {
        players.push(player);
        console.log(players);
        socket.broadcast.emit("new player", player);
      });

      socket.on("get players", () => {
        socket.broadcast.emit("get players");
      });

      socket.on("send players", (player) => {
        socket.broadcast.emit("send players", player);
      });
    });
  }
  res.end();
};

export default SocketHandler;
