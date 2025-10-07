import { useContext } from 'react';
import { AuthContext } from '../Router';
import httpClient from '../httpClient';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await httpClient.post("/auth/logout");
      localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token'); // If using refresh tokens
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally, handle error display to the user
    }
  };

  return (
    <header className="bg-blue-800 text-white p-6">
      <div className="flex items-center gap-4">
        <img
          src="/logo-clear.png"
          alt="Platform Logo"
          className="w-24 h-24 object-contain"
        />
        <h1 className="text-2xl font-bold">Learn, Share, Grow Together</h1>
      </div>

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