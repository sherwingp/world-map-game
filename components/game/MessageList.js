import Message from "./Message.js";
import { nanoid } from "nanoid";

export default function MessageList({ messages }) {
  const messagesList = messages.map((message) => (
    { id: "message-" + nanoid(), text: message }
  ));

  const ChatMessages = messagesList.map((message) => (
    <Message id={message.id} key={message.id} text={message.text} />
  )).reverse();

  return <ul>{ChatMessages}</ul>;
}
