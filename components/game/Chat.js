import { useEffect, useState } from "react";
import MessageList from "./MessageList.js";
import PlayerContext from "../../contexts/player.js";
import { useContext } from "react";
import { nanoid } from "nanoid";

const Chat = ({ socket }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { player } = useContext(PlayerContext);

  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket.on("chat message", (msg) => {
      setMessages((state) => {
        return [...state, msg];
      });
    });

    socket.on("player joined", (newPlayer) => {
      const newConnection = {
        id: "message-" + nanoid(),
        author: "System",
        text: `${newPlayer} joined the game.`,
      };

      setMessages((state) => [...state, newConnection]);
    });

    socket.on("player left", (disconnectedPlayer) => {
      const newMessage = {
        id: "message-" + nanoid(),
        author: "System",
        text: `${disconnectedPlayer} left the game.`,
      };

      setMessages((state) => [...state, newMessage]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      id: "message-" + nanoid(),
      author: player.name,
      text: input,
    };

    setMessages((state) => {
      return [...state, newMessage];
    });

    socket.emit("chat message", newMessage);

    setInput("");
  };

  return (
    <div>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
          data-testid="input-chat"
          id="chat-input"
          value={input}
          type="text"
          placeholder="Type something"
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" name="submit-clue" value="Chat" />
      </form>
      <MessageList messages={messages} />
    </div>
  );
};

export default Chat;
