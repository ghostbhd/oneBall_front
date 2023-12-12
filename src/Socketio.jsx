import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';


const SOCKET_SERVER_URL = 'http://localhost:3009';


const SocketContext = createContext(null);

// Hook to enable any component to access the socket context
export const useSocket = () => useContext(SocketContext);


export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create the socket only once (on mount)
        const newSocket = io(SOCKET_SERVER_URL, { autoConnect: true });

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
