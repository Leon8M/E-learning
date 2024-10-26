import { React, useState, useEffect } from 'react';
import httpClient from '../httpClient';

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post("http://localhost:8080/logout");
    window.location.href = "/";
  }

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
    <div>
      <h1>Welcome</h1>

      {user != null ? (
        <div>
          <h2>Logged in</h2>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <div className='buttons'>
            <a href="/login"><button>Login</button></a>
            <a href="/register"><button>Register</button></a>
          </div> 
        </div>
      )};
    </div>
  );
};

export default LandingPage;
