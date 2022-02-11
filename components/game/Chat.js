import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
let socket;

const Chat = () => {
  const [input, setInput] = useState('')

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }



  return (
      <input
        id="chat-input"
        value={input}
        placeholder="Type something"
        onChange={onChangeHandler}
      />
  );
};

export default Chat;
