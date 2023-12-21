import { useState } from 'react';
// import { useHistory } from 'react-router-dom';


import { useSocket } from "../../Socketio.jsx";


const ChannelCreation = ({ onClose, currentUserToken }) => {
  const [channelName, setChannelName] = useState('');
  
  const [channelType, setChannelType] = useState('public');
  const [password, setPassword] = useState('');

  const socket = useSocket();

  const handleChannelTypeChange = (type) => {
    setChannelType(type);
  };

  const handleSubmit = async () => {
    try {
      const channelData = {
        ownerId: parseInt(currentUserToken.id),
        channelName,
        channelType,
        password: channelType === 'protected' ? password : undefined,
      };
  
      socket.emit('createChannel', channelData);
  
      console.log("----", currentUserToken.id);
      
      console.log("----",channelName);
      console.log("----",channelType);
      
      // Rest of your code to navigate or close the form
      onClose();
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };


return (
  <div className="fixed inset-0 flex items-center  justify-center drop-shadow-lg">
    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
    <div className="bg-bDark_3 text-org_3 rounded-lg p-7 z-10">
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Channel Name"
        className="w-full p-2 border rounded"
      />

      <div className="flex items-center py-3  text-bLight_5 space-x-3">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="public"
            checked={channelType === 'public'}
            onChange={() => setChannelType('public')}
          />
          <span>Public</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="private"
            checked={channelType === 'private'}
            onChange={() => setChannelType('private')}
          />
          <span>Private</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="protected"
            checked={channelType === 'protected'}
            onChange={() => setChannelType('protected')}
          />
          <span>Protected</span>
        </label>

        {channelType === 'protected' && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-1 px-2 ms-8 border rounded"
          />
        )}
      </div>

      <div className="flex items-center justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={handleSubmit} className="px-3 py-2 ms-8 rounded bg-org_3 text-white">
          Create Channel
        </button>
      </div>
    </div>
  </div>
);
};

export default ChannelCreation;
