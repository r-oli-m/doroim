import React, { useState } from "react";
import "./Inventory.css";
//images
import postit from "./postit.png";
//chatbot using GPT 3.5 turbo
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
const OPENAI_API_KEY = "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";

function Chatbot() {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      message:
        "Hello, I am a ChatBot! Feel free to ask me questions about college life!",
      sender: "ChatGPT",
    },
  ]);
  const handleUserMessage = async (userMessage) => {
    const newUserMessage = {
      message: userMessage,
      sender: "user",
      direction: "outgoing",
    };
    const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedChatMessages);
    setIsChatbotTyping(true);
    await processUserMessageToChatGPT(updatedChatMessages);
  };
  async function processUserMessageToChatGPT(messages) {
    let apiMessages = messages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
    const systemMessage = {
      role: "system",
      content:
        "Answer questions about college living and dorm life. Answer questions about which items a college student should bring to their college apartment or dorm.",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setChatMessages([
          ...messages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsChatbotTyping(false);
      });
  }

  return (
    <>
      <div className="chatbot-container">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isChatbotTyping ? (
                  <TypingIndicator content="Please wait" />
                ) : null
              }
            >
              {chatMessages.map((message, i) => {
                return (
                  <Message
                    key={i}
                    model={message}
                    style={
                      message.sender === "ChatGPT" ? { textAlign: "left" } : {}
                    }
                  />
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Type Message here"
              onSend={handleUserMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

const titles = [
  "Organization and Storage:",
  "Clothing and Laundry:",
  "Electronics:",
  "Toiletries and Hygiene:",
  "Kitchen and Cleaning Items:",
];

const items = [
  [
    "Storage Bins",
    "Bulletin Board",
    "Dry-erase whiteboard",
    "Command strips :) (for decoration)",
    "Desk Organizers",
  ],
  [
    "Bedsheets and Pillowcases",
    "Blankets",
    "Mattress Topper",
    "Clothes",
    "Clothes Hangers",
    "Laundry Detergent",
    "Laundry Bag",
  ],
  [
    "Laptop / Tablet",
    "Headphones",
    "Surge Protector",
    "Extension Cords",
    "Chargers",
    "Other Items, like Gaming consoles",
  ],
  [
    "Vitamins / Medication",
    "First-aid Kit",
    "Shower Caddy",
    "Shower Shoes",
    "Towels",
    "Body Wash",
    "Shampoo and Conditioner",
    "Lotion",
    "Skincare Items",
    "Razor and shaving cream",
    "Feminine hygiene products",
  ],
  [
    "Paper towels",
    "Trashbags",
    "All-purpose cleaner",
    "Air freshener",
    "Wet wipes",
    "Utensils / Silverware",
    "Food Storage conatiners",
    "Tissues",
    "Water Bottle",
    "Minifridge",
    "Microwave",
  ],
];

const Inventory = () => {
  return (
    <div className="inventory-container">
      {/* --------------- clipboard --------------- */}
      <div className="clipboard-container">
        <div className="metal"></div>
        <div className="paper">
          <div className="suggestions">
            <h1>Suggested Dorm Items</h1>
            {titles.map((title, index) => (
              <div key={index}>
                <h3>{title}</h3>
                <ul>
                  {items[index].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* --------------- --------------- --------------- */}
      <div className="right-container">
        <div className="imgs-container">
          <div className="image-container">
            <img src={postit} alt="post-it" className="postit-image" />
            <div className="image-text">
              Still unsure about what to bring? Ask the chatbot!
            </div>
          </div>
          <div className="image-container">
            <img src={postit} alt="post-it" className="postit-image2" />
            <div className="image-text2">
              Remember these are suggestions, and some items might change based
              on personal preference and whoch college you go to!
            </div>
          </div>
        </div>
        <Chatbot />
      </div>
    </div>
  );
};
export default Inventory;
