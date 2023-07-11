import { useCallback, useState } from "react";
import { createRequestPayload } from "../util/request";
import { EventData, EventDataTypes, History } from "../types/types";
import { useWebSocket } from "./useWebSocket";
import { streamURL } from "../constants/network";

export const useTextGenerationAPI = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isStreaming, setStreaming] = useState<boolean>(false);

  const handleMessage = useCallback((event: MessageEvent<string>) => {
    setLoading(false);
    // Convert the string payload into meaningful JSON object
    const eventData: EventData = JSON.parse(event.data);

    // Currently there are 2 handled types
    switch (eventData.event) {
      case EventDataTypes.TEXT_STREAM: {
        // When text is getting received. Ths gets called multiple times, when
        // there's additional text that can be received from the API.
        setStreaming(true);
        setHistory(eventData.history);
        break;
      }
      case EventDataTypes.STREAM_END: {
        // This denotes that we've received the entire message and
        // we're not expecting anything more from the API.
        setStreaming(false);
        break;
      }
    }
  }, []);

  const { socket, isConnected } = useWebSocket(streamURL, handleMessage);

  const [history, setHistory] = useState<History>({
    internal: [],
    visible: [],
  });

  /**
   * Reset the history, so there's no prior context being sent
   * to the stream. This essentially makes it forget everything that
   * was mentioned before.
   */
  const resetHistory = useCallback(() => {
    setHistory({
      visible: [],
      internal: [],
    });
  }, []);

  /**
   * Sends the message to the streaming API only when it is connected.
   * @param message
   * @returns
   */
  const sendMessage = (message: string) => {
    if (!isConnected || !socket) return;
    setHistory((history) => ({
      ...history,
      visible: [...history.visible, [message]],
    }));
    socket.send(createRequestPayload(message, history));

    setLoading(true);
  };

  return {
    sendMessage,
    history,
    isLoading,
    isConnected,
    isStreaming,
    resetHistory,
  };
};
