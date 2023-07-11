import { useRef, useEffect, useState } from "react";

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
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsConnected(true);
    };

    const handleClose = () => {
      setIsConnected(false);
    };
    if (url) {
      socket.current = new WebSocket(url);
      socket.current.addEventListener("open", handleOpen);
      socket.current.addEventListener("close", handleClose);
      socket.current.addEventListener("error", handleClose);
      socket.current.addEventListener("message", handleMessage);
    }
    return () => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
        socket.current.removeEventListener("open", handleOpen);
        socket.current.removeEventListener("close", handleClose);
        socket.current.removeEventListener("error", handleClose);
        socket.current.removeEventListener("message", handleMessage);
      }
    };
  }, []);

  return { socket: socket.current, isConnected: isConnected };
};
