const base = import.meta.env.VITE_TG_STREAM_BASE_URL || "ws://localhost:5005";

export const streamURL = `${base}/api/v1/chat-stream`;
