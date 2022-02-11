import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
import MessageList from './MessageList.js';

let socket;

const Chat = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-messages', msg => {
      setMessages([...messages].concat(msg))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setMessages([...messages, input])
    console.log(messages.push(input));
    socket.emit('submit-message', messages)

    setInput('')
  }

  return (
    <div>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
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
