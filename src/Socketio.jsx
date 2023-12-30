import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';


const SOCKET_SERVER_URL = 'http://localhost:3009/';


const SocketContext = createContext(null);

// Hook to enable any component to access the socket context
export const useSocket = () => useContext(SocketContext);


export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    var  token;
  const toke = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
      if (toke)
          token = toke.split("=")[1];
    useEffect(() => {
        // Create the socket only once (on mount)
        const newSocket = io(SOCKET_SERVER_URL, {
          auth: {
        token: token,
      }
    });
        console.log("connected =================> ", token);

        setSocket(newSocket);

        // Disconnect on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};