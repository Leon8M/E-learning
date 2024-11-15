import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import httpClient from '../httpClient';

// Establish connection to WebSocket server
const socket = io("http://localhost:8080", {
  withCredentials: true,
});

const Chat = ({ user }) => {
  const [name, setName] = useState(user?.username || ''); // Initialize with user's username
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

  if (!user) {
    return <p className="p-4 text-center text-red-500">You must be logged in to access the chat.</p>;
  }

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
    const newMessage = { name, message };

    // Emit the message to the server
    socket.emit("message", newMessage);

    // Update the local state immediately
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear input after sending
    setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
      {!isInRoom ? (
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-center text-blue-600">Enter The Chat Room</h3>
          <input
            type="text"
            placeholder="Pick a name"
            className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-4">
            <input
              type="text"
              placeholder="Room Code"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <div className="flex justify-between mt-4 space-x-2">
              <button
                onClick={joinRoom}
                className="w-full p-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Join Room
              </button>
              <button
                onClick={createRoom}
                className="w-full p-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Create Room
              </button>
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-center text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-lg bg-white rounded-lg shadow-lg h-5/6">
          <h2 className="p-4 text-xl font-semibold text-center text-blue-600">Chat Room: {room}</h2>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 my-2 bg-white border rounded-md shadow-sm">
                <p className="font-semibold text-blue-600">{msg.name}</p>
                <p className="text-gray-700">{msg.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center p-4 border-t bg-gray-100">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
