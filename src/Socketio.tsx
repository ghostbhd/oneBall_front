import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import config from "./config";
import { useNavigate } from "react-router-dom";

const SOCKET_SERVER_URL = config.domain;

const SocketContext = createContext(null);

// Hook to enable any component to access the socket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const history = useNavigate();
  var token;
  const toke = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
  if (toke) token = toke.split("=")[1];
  
  useEffect(() => {
    // Create the socket only once (on mount)
    const newSocket = io(SOCKET_SERVER_URL, {
      autoConnect: true,
      auth: {
        token: token,
      },
    });
    newSocket.io.on("error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      Cookies.remove("accessToken");
      history("/auth");
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
      {/* Pass the socket value to all children */}
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
