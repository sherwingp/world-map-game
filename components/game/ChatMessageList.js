import ChatMessage from "./ChatMessage.js";

export default function ChatMessageList({ messages }) {
  const ChatMessageList = messages
    .map((message) => (
      <ChatMessage
        id={message.id}
        key={message.id}
        author={message.author}
        text={message.text}
      />
    ))
    .reverse();

  return <ul>{ChatMessageList}</ul>;
}
