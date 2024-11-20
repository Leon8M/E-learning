import { useState } from 'react';
import Chat from '../Components/Chat';
import Header from '../Components/Header';
import Quiz from '../Components/Quiz';
import File from '../Components/File';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Chat'); // Default tab

  const renderComponent = () => {
    switch (activeTab) {
      case 'Chat':
        return <Chat user={user} />;
      case 'Quiz':
        return <Quiz user={user} />;
      case 'File':
        return <File user={user} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header setUser={setUser} />
      <div className="tab-container p-4 bg-gray-100 shadow-md">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'Chat' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('Chat')}
        >
          Chat
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === 'Quiz' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('Quiz')}
        >
          Quiz
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'File' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('File')}
        >
          File
        </button>
      </div>
      <div className="component-container mt-4">{renderComponent()}</div>
    </div>
  );
};

export default LandingPage;
