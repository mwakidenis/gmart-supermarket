import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { X, Send } from "lucide-react";
import "./ChatbotHelp.css";

const ChatbotHelp = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const api_key = "AIzaSyBmX8rY3EULLOV2JYJ1Zx9FG1JR7RDDpXI";
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, isBot: false }]);
      setInputMessage("");

      try {
        const response = await fetch(`${url}?key=${api_key}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      inputMessage +
                      "You are Ratna Supermarket's customer support bot. Help the users in any way possible, add no formatting in your responses & keep it short.",
                  },
                ],
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const botResponse = data.candidates[0].content.parts[0].text;
          setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
        } else {
          console.error("API request failed:", response.statusText);
          setMessages((prev) => [
            ...prev,
            {
              text: "Sorry, I couldn't process your request. Please try again.",
              isBot: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { text: "An error occurred. Please try again later.", isBot: true },
        ]);
      }
    }
  };

  return (
    <>
      {!showChatbot && (
        <div className="chatbotHelpContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="auto"
            viewBox="0 -960 960 960"
            width="32px"
            fill="white"
            onClick={() => setShowChatbot(true)}
          >
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="26" fill="rgb(253, 134, 75)" />
          </svg>
        </div>
      )}
      {showChatbot && (
        <div className="chatbotContainer">
          <div className="chatbotHeader">
            <h5 className="mb-0">Chat with us</h5>
            <Button
              variant="link"
              className="closeButton"
              onClick={() => setShowChatbot(false)}
            >
              <X size={24} />
            </Button>
          </div>
          <div className="chatbotBody">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isBot ? "bot" : "user"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbotFooter">
            <InputGroup>
              <Form.Control
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button variant="outline-secondary" onClick={handleSendMessage}>
                <Send size={18} />
              </Button>
            </InputGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotHelp;
