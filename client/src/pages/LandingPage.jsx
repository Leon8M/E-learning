import { useState } from 'react';
import Chat from '../Components/Chat';
import Header from '../Components/Header';
import Quiz from '../Components/Quiz';

const LandingPage = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header setUser={setUser} />
      <Chat user={user} />
      <Quiz user={user} /> 
    </div>
  );
};

export default LandingPage;
