
import React, { useState, useEffect, useRef } from "react";
import { sendChatMessage } from '../apis/tourApis'

const ChatBot = ({ startTour, setFeatureId, setPageId }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: "bot", 
      content: "Hello! I can help you navigate through our platform. What would you like to do today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    if (isMinimized && messages.length > 0 && messages[messages.length - 1].type === "bot") {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isMinimized]);

  useEffect(() => {
    if (!isMinimized) {
      setUnreadCount(0);
    }
  }, [isMinimized]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(input);
      const botMessage = { 
        id: Date.now() + 1, 
        type: "bot", 
        content: data.message,
        tourSteps: data.tourSteps || null
      };
      setFeatureId(data.featureId);
      setPageId(data.pageId);
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, type: "bot", content: "Sorry, I'm having trouble connecting. Try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {
    return (
      <div>
        <p className="text-gray-800">{message.content}</p>

        {message.tourSteps && (
          <>
            <ol className="list-decimal pl-5 space-y-2">
              {message.tourSteps.map((step, index) => (
                <li key={index} className="text-gray-700">{step.title}</li>
              ))}
            </ol>
            <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline"
               onClick={() => startTour(message.tourSteps)}>
              Click here to start the interactive guide
            </p>
          </>
        )}
      </div>
    );
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getLastMessage = () => {
    if (messages.length === 0) return "";
    return messages[messages.length - 1].content;
  };

  const chatHeight = isMinimized ? "h-12" : "h-96";

  return (
    <div 
      className={`flex flex-col bg-white rounded-lg shadow-lg w-80 ${chatHeight} fixed bottom-5 left-5 z-40 overflow-hidden transition-all duration-300`}
    >
      <div 
        className="bg-blue-600 p-3 text-white font-medium flex justify-between items-center cursor-pointer"
        onClick={toggleMinimize}
      >
        <h3>Support Assistant</h3>
        <div className="flex items-center">
          {isMinimized && unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
              {unreadCount}
            </span>
          )}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transform transition-transform ${isMinimized ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMinimized ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
            />
          </svg>
        </div>
      </div>
      
      {isMinimized ? (
        <div className="px-3 py-1 text-sm text-gray-500 truncate overflow-hidden">
          {getLastMessage()}
        </div>
      ) : (
        <>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 p-2 rounded-lg max-w-[80%] ${
                  msg.type === "user"
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {renderMessage(msg)}
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-1 ml-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce"></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce delay-100"></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="border-t p-2">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
