const ChatMessage = ({ author, text }) => {
  return (
    <li className="message">
      <div className="chat-body">
        <strong className="primary-font">{author}: </strong>
        <p>{text}</p>
      </div>
    </li>
  );
};

export default ChatMessage;
