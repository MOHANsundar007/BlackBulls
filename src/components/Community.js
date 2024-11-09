import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, push, onValue, serverTimestamp } from "firebase/database";
import "./Community.css"; 

const Community = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = ref(database, "community_chat");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      setMessages(loadedMessages);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, "community_chat");
    push(messagesRef, {
      messageText: newMessage,
      senderName: "Ajith Kumar", 
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Community Chat</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderName === "Ajith Kumar" ? "my-message" : "other-message"}`}
          >
            <div className="message-sender">{msg.senderName}</div>
            <div className="message-text">{msg.messageText}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Community;
