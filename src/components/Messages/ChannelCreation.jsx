import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';



const ChannelCreation = ({ onClose }) => {
  const [channelName, setChannelName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [members, setMembers] = useState(''); 
//   const history = useHistory(); 

  const handleSubmit = async () => {
    try {
      // You would call your backend service here. This is just a placeholder example.
      const channel = await createChannelForUser(ownerId, channelName, isPrivate, password);
      // Once the channel is created, you would add members to it
      for (const userId of members.split(',')) { // Assuming `members` is a comma-separated list of user IDs
        await addMemberToChannel(channel.id, parseInt(userId.trim()), password);
      }
      // Redirect to the newly created channel's page
      history.push(`/channel/${channel.id}`);
      onClose(); // Close the modal
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center  justify-center drop-shadow-lg"> {/* Full-screen with flexbox centering */}
    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={m}></div> {/* Backdrop */}
    <div className="bg-bDark_3 text-bLight_2 rounded-lg p-7 z-10" > {/* Modal content */}
      {/* Modal Content */}
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Channel Name"
        className="w-full p-2 border rounded"
      />
       <div className="flex items-center justify-between"> {/* Flex container for checkboxes and buttons */}
          <label className="flex items-center py-3 space-x-3">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <span>Private</span>
          </label>
          {isPrivate && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-1 px-2 ms-8 border rounded"
            />
          )}
        </div>
        <input
          type="text"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          placeholder="Add members"
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center justify-end space-x-2"> {/* Flex container for buttons */}
          <button onClick={onClose} className="px-4 py-2  rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-3 py-2 ms-8 rounded bg-org_3 text-white">
        Create Channel
      </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCreation;

// const createChannelForUser = async (ownerId, channelName, isPrivate, password) => {
//     const response = await fetch('/api/channel', { // Replace with your actual API endpoint
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Include any other headers your API requires, like authorization tokens
//       },
//       body: JSON.stringify({
//         ownerId,
//         channelName,
//         isPrivate,
//         password,
//       }),
//     });
  
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
  
//     return await response.json(); // This will parse the JSON response body and return a promise
//   };
  
//   const addMemberToChannel = async (channelId, userId, password) => {
//     const response = await fetch(`/api/channel/${channelId}/add_member`, { // Replace with your actual API endpoint
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Include any other headers your API requires
//       },
//       body: JSON.stringify({
//         userId,
//         password, // Only include password if necessary (i.e., if the channel is private)
//       }),
//     });
  
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
  
//     return await response.json(); // Assuming your API returns the added member's data
//   };
  