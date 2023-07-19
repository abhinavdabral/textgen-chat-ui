import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Very simple hooks that initializes a websocket
 * and closes connection on unload.
 * TODO: Handle retry
 * @param url
 * @returns
 */
export const useWebSocket = (
  url: string,
  handleMessage: (event: MessageEvent<any>) => void
) => {
  const socket = useRef<WebSocket | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connect = useCallback(() => {
    const handleOpen = () => {
      console.log("Connection successful.");
      setIsConnected(true);
    };

    const handleError = () => {
      setIsConnected(false);
    };

    const handleClose = () => {
      setIsConnected(false);
      console.log("Connection broken. Trying to reconnect in 1 second.");
      cleanup();
      timeoutRef.current = setTimeout(() => {
        console.log("Trying to connect...");
        timeoutRef.current = null;
        connect();
      }, 1000);
    };

    const cleanup = () => {
      if (socket.current) {
        if (socket.current.readyState === WebSocket.OPEN) {
          socket.current.close();
        }
        socket.current.removeEventListener("open", handleOpen);
        socket.current.removeEventListener("close", handleClose);
        socket.current.removeEventListener("error", handleError);
        socket.current.removeEventListener("message", handleMessage);
      }
    };

    socket.current = new WebSocket(url);
    socket.current.addEventListener("open", handleOpen);
    socket.current.addEventListener("close", handleClose);
    socket.current.addEventListener("error", handleError);
    socket.current.addEventListener("message", handleMessage);

    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = connect();
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      cleanup();
    };
  }, []);

  return { socket: socket.current, isConnected: isConnected };
};
