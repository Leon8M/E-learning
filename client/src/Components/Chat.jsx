import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import httpClient from '../httpClient';

// Establish connection to WebSocket server
const socket = io("http://localhost:8080", {
  withCredentials: true,
});

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Listen for messages from server
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => socket.off("message");
  }, []);

  const createRoom = async () => {
    if (!name) {
      setError("Please enter your name");
      return;
    }
    try {
      const response = await httpClient.post("http://localhost:8080/create-room", { name });
      setRoom(response.data.room);
      setIsInRoom(true);
      setError('');
    } catch (err) {
      setError("Error creating room");
      console.error(err);
    }
  };

  const joinRoom = async () => {
    if (!name || !room) {
      setError("Please enter both name and room code");
      return;
    }
    try {
      await httpClient.post("http://localhost:8080/join-room", { name, code: room });
      setIsInRoom(true);
      setError('');
    } catch (err) {
      setError("Error joining room");
      console.error(err);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { data: message });
      setMessage('');  // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      {!isInRoom ? (
        <div className="room-entry">
          <h3>Enter The Chat Room</h3>
          <input
            type="text"
            placeholder="Pick a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="room-controls">
            <input
              type="text"
              placeholder="Room Code"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join Room</button>
            <button onClick={createRoom}>Create Room</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="chat-room">
          <h2>Chat Room: {room}</h2>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.name}:</strong> {msg.message}
                <span className="timestamp">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
