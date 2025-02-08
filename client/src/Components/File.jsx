import { useState } from 'react';
import httpClient from '../httpClient'; // Ensure httpClient is correctly configured and imported

const File = ({ user }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  if (!user) {
    return <p className="p-4 text-center text-red-500">You must be logged in to access file sharing.</p>;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !name) {
      alert('Please provide a file and a name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const response = await httpClient.post('https://e-learning-nvak.onrender.com/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      setFile(null);
      setName('');
    } catch (err) {
      alert(err.response?.data?.error || 'File upload failed.');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await httpClient.get(`https://e-learning-nvak.onrender.com/search-files?query=${searchQuery}`);
      setSearchResults(response.data.files);
    } catch (err) {
      alert(err.response?.data?.error || 'Search failed.');
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
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3 className="font-semibold mb-2">Search Results:</h3>
          <ul className="list-disc list-inside">
            {searchResults.map((file) => (
              <li key={file.id} className="mb-2">
                <strong>{file.name}</strong> - <a href={file.path} download>
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default File;
