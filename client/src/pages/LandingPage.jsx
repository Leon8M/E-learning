import { useState, useContext } from 'react';
import Chat from '../Components/Chat';
import Header from '../Components/Header';
import Quiz from '../Components/Quiz';
import File from '../Components/File';
import { AuthContext } from '../Router';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Chat'); // Default tab
  const [selectedFileId, setSelectedFileId] = useState(null); // New state for selected file

  const handleFileSelect = (fileId) => {
    setSelectedFileId(fileId);
    setActiveTab('Quiz'); // Automatically switch to Quiz tab when a file is selected
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'Chat':
        return <Chat user={user} />;
      case 'Quiz':
        return <Quiz user={user} fileId={selectedFileId} />;
      case 'File':
        return <File user={user} onFileSelect={handleFileSelect} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header /> {/* Header now consumes AuthContext directly */}
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