import { useState, useEffect } from 'react';
import httpClient from '../httpClient';

const Header = () => {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post("http://localhost:8080/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("http://localhost:8080/@me");
        setUser(response.data);
      } catch (error) {
        console.error("Authentication error");
      }
    })();
  }, []);

  return (
    <header className="bg-blue-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the E-Learning Platform</h1>

      {user ? (
        <div className="p-4 bg-blue-700 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Logged in</h2>
          <h3 className="text-lg mb-1">Username: {user.username}</h3>
          <h3 className="text-lg mb-4">Email: {user.email}</h3>
          <button 
            onClick={logoutUser} 
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      ) : (
        <div className="p-4 bg-gray-700 rounded shadow-lg">
          <p className="mb-4">Not logged in</p>
          <div className="flex gap-4">
            <a href="/login">
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
                Login
              </button>
            </a>
            <a href="/register">
              <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
                Register
              </button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
