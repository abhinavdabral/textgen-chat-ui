import { useRef, useEffect } from "react";
import { useTextGenerationAPI } from "./hooks/useTextGenerationAPI";

function App() {
  const endOfConversation = useRef<HTMLDivElement | null>(null);
  const textbox = useRef<HTMLTextAreaElement | null>(null);
  const {
    sendMessage,
    isConnected,
    isLoading,
    isStreaming,
    history,
    resetHistory,
  } = useTextGenerationAPI();
  const handleSubmit = () => {
    if (textbox.current) {
      const text = textbox.current.value;
      textbox.current.value = "";
      sendMessage(text);
    }
  };

  useEffect(() => {
    if (endOfConversation.current) {
      endOfConversation.current.scrollIntoView();
    }
  }, [history]);

  return (
    <div className="App">
      <div className="header">
        <div></div>
        <div></div>
        <div>
          <button
            className="btn-clear"
            disabled={isLoading || isStreaming}
            onClick={() => resetHistory()}
          >
            Clear context
          </button>
        </div>
      </div>
      <div className="history-container">
        <div className="scrollable">
          {history.visible.map((historyItem, index) => (
            <div className="conversation" key={index}>
              <div className="sent">{historyItem[0]}</div>
              {historyItem[1] && (
                <div className="receive">{historyItem[1]}</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="conversation">
              <div className="loading">Bot is typing ...</div>
            </div>
          )}
          {!isConnected && (
            <div className="conversation">
              <div className="loading">
                Disconnected from the server. Please refresh.
              </div>
            </div>
          )}
          <div ref={endOfConversation}>&nbsp;</div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          ref={textbox}
          className="prompt-text"
          onKeyUp={(event) => {
            if (event.key === "Enter" && event.shiftKey === false) {
              handleSubmit();
            }
          }}
          disabled={isLoading}
          placeholder={
            isLoading
              ? "Please wait for the response first."
              : "Type your prompt here. Use Shift+Enter for new line."
          }
        ></textarea>
        <button
          className="btn-send"
          disabled={isLoading || isStreaming || !isConnected}
          onClick={handleSubmit}
        >
          Send <span className="keycap">↵</span>
        </button>
      </div>
    </div>
  );
}

export default App;
