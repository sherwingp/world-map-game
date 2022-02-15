const ChatMessage = ({ author, text }) => {
  return (
    <li className="message">
      {author}: {text}
    </li>
  );
};

export default ChatMessage;
