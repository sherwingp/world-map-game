import Message from "./Message.js";

export default function MessageList({ messages }) {
  const MessageList = messages
    .map((message) => (
      <Message
        id={message.id}
        key={message.id}
        author={message.author}
        text={message.text}
      />
    ))
    .reverse();

  return <ul>{MessageList}</ul>;
}
