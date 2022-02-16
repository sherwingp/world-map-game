import { useEffect, useState } from "react";
import ChatMessageList from "./ChatMessageList.js";
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
    <div className="card">
      <div className="card-header text-center">
        <span>Chat Box</span>
      </div>
        <ChatMessageList messages={messages} />
        <form className="chatbox-input form-control input-sm" id="chat-form" onSubmit={handleSubmit}>
          <input
            id="chat-input"
            value={input}
            type="text"
            placeholder="Type something"
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" name="submit-clue" value="Chat" />
        </form>
    </div>
  );
};

export default Chat;
