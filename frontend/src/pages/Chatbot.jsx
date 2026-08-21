import { useState } from "react";
import { sendChatMessage } from "../services/api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = input) => {
    const message = text.trim();

    if (!message || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setLoading(true);

    try {
      const response = await sendChatMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response?.response ||
            response?.message ||
            "I couldn't understand that. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to FarmStack AI. Please check that the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
  };

  const suggestions = [
    "🌾 Recommend a crop",
    "📈 Predict market price",
    "🌱 Improve my yield",
    "💰 Calculate profit",
  ];

  return (
    <div className="farm-chatbot">

      {/* Background glow */}
      <div className="chat-glow glow-one"></div>
      <div className="chat-glow glow-two"></div>

      {/* TOP BAR */}
      <div className="chatbot-topbar">

        <div className="ai-brand">

          <div className="ai-avatar">
            🌱
          </div>

          <div>
            <div className="ai-title-row">
              <h2>FarmStack AI</h2>
              <span className="ai-badge">AI</span>
            </div>

            <div className="ai-status">
              <span className="status-dot"></span>
              Online • Agriculture Intelligence
            </div>
          </div>

        </div>

        <button
          className="clear-chat"
          onClick={clearChat}
        >
          ↻ <span>New Chat</span>
        </button>

      </div>


      {/* MAIN CHAT */}
      <main className="chatbot-main">

        {/* WELCOME SCREEN */}
        {messages.length === 0 && (

          <div className="chat-welcome">

            <div className="welcome-icon">
              🌾
            </div>

            <div className="welcome-label">
              FARMSTACK INTELLIGENCE
            </div>

            <h1>
              Your AI partner for
              <span> smarter farming.</span>
            </h1>

            <p className="welcome-description">
              Ask about crop recommendations, market prices,
              yield predictions, farming decisions and more.
            </p>

          </div>

        )}


        {/* MESSAGES */}
        <div className="messages-area">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`chat-row ${
                message.role === "user"
                  ? "user"
                  : "assistant"
              }`}
            >

              {message.role === "assistant" && (
                <div className="message-avatar">
                  🌱
                </div>
              )}

              <div className="message-content">

                <div className="message-name">
                  {message.role === "user"
                    ? "You"
                    : "FarmStack AI"}
                </div>

                <div className="message-bubble">
                  {message.content}
                </div>

              </div>

            </div>

          ))}


          {/* TYPING */}
          {loading && (

            <div className="chat-row assistant">

              <div className="message-avatar">
                🌱
              </div>

              <div className="message-content">

                <div className="message-name">
                  FarmStack AI
                </div>

                <div className="typing-bubble">

                  <span></span>
                  <span></span>
                  <span></span>

                  <small>Thinking...</small>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>


      {/* SUGGESTIONS */}
      {messages.length === 0 && (

        <div className="suggestions">

          {suggestions.map((suggestion, index) => (

            <button
              key={index}
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion}
            </button>

          ))}

        </div>

      )}


      {/* INPUT */}
      <form
        className="chat-input-wrapper"
        onSubmit={handleSubmit}
      >

        <div className="chat-input-box">

          <span className="input-icon">
            ✦
          </span>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask FarmStack AI anything..."
            disabled={loading}
          />

          <button
            type="submit"
            className="send-button"
            disabled={!input.trim() || loading}
          >
            ↑
          </button>

        </div>

        <p className="ai-disclaimer">
          FarmStack AI can make mistakes. Verify important
          farming decisions.
        </p>

      </form>

    </div>
  );
}

export default Chatbot;