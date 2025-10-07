import { useState } from 'react';
import httpClient from '../httpClient';

const File = ({ user, onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [searchError, setSearchError] = useState('');

  if (!user) {
    return <p className="p-4 text-center text-red-500">You must be logged in to access file sharing.</p>;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setUploadError('');
    if (!file || !name) {
      setUploadError('Please provide a file and a name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const response = await httpClient.post('/file/upload-file', formData);
      alert(response.data.message); // Keeping alert for success for now
      setFile(null);
      setName('');
    } catch (err) {
      setUploadError(err.response?.data?.error || 'File upload failed.');
    }
  };

  const handleSearch = async () => {
    setSearchError('');
    try {
      const response = await httpClient.get(`/file/search-files?query=${searchQuery}`);
      setSearchResults(response.data.files);
    } catch (err) {
      setSearchError(err.response?.data?.error || 'Search failed.');
    }
  };

  return (
    <div className="file-container p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">File Sharing</h2>

      {/* File Upload */}
      <div className="upload-section mb-6">
        <h3 className="font-semibold mb-2">Upload File</h3>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <input
          type="text"
          placeholder="Enter file name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded border border-gray-300 mb-2"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>
        {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
      </div>

      {/* File Search */}
      <div className="search-section mb-6">
        <h3 className="font-semibold mb-2">Search Files</h3>
        <input
          type="text"
          placeholder="Search by file name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded border border-gray-300 mb-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Search
        </button>
        {searchError && <p className="text-red-500 text-sm mt-2">{searchError}</p>}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3 className="font-semibold mb-2">Search Results:</h3>
          <ul className="list-disc list-inside">
            {searchResults.map((file) => (
              <li key={file.id} className="mb-2 flex justify-between items-center">
                <div>
                  <strong>{file.name}</strong> - <a href={`/file/files/${file.path.split('/').pop()}`} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                  {file.summary && <p className="text-sm text-gray-600">Summary: {file.summary}</p>}
                  {file.questions && <p className="text-sm text-gray-600">Questions: {file.questions}</p>}
                </div>
                {onFileSelect && (
                  <button
                    onClick={() => onFileSelect(file.id)}
                    className="ml-4 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                  >
                    Select for Quiz
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default File;
