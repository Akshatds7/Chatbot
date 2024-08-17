import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputBox from './Inputbox';
import jchatbot from '../jchatbot.json'; 
import Header from './Header';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState({});
  const [userInput, setUserInput] = useState('');
  const [userInputs, setUserInputs] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const startMessage = jchatbot.find(msg => msg.start);
    setMessages([startMessage]);
    setCurrentMessage(startMessage);
  }, []);

  useEffect(() => {
    if (currentMessage.trigger && !currentMessage.userInput) {
      const nextMessage = jchatbot.find(msg => msg.id === currentMessage.trigger);
      if (nextMessage) {
        setMessages(prev => [...prev, nextMessage]);
        setCurrentMessage(nextMessage);
      }
    }
  }, [currentMessage]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserInput = (input) => {
    const userMessage = { message: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    const nextMessage = jchatbot.find(msg => msg.id === currentMessage.trigger);
    if (nextMessage) {
      const selectedItem = nextMessage.metadata?.payload.find(item => item.value === input);
      if (selectedItem) {
        setUserInputs(prev => [...prev, { value: input, price: selectedItem.price }]);
        const updatedTotal = userInputs.reduce((sum, input) => sum + input.price, 0) + selectedItem.price;
        setTotalBill(updatedTotal);
      }
      setMessages(prev => [...prev, nextMessage]);
      setCurrentMessage(nextMessage);
    }
  };

  const handleButtonClick = (trigger, label) => {
    const userMessage = { message: label, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    const nextMessage = jchatbot.find(msg => msg.id === trigger);
    if (nextMessage) {
      if (nextMessage.id === 9) {
        nextMessage.message = `Your total bill is $${totalBill}.`;
      }
      setMessages(prev => [...prev, nextMessage]);
      setCurrentMessage(nextMessage);
    }
  };

  return (
    <div className="chat-bot">
      <Header/>
      <div className="message-container">
        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg.message}
            metadata={msg.metadata}
            isUser={msg.isUser}
            handleButtonClick={handleButtonClick}
          />
        ))}
        <div ref={messageEndRef} />
      </div>
      {currentMessage.userInput && (
        <InputBox
          userInput={userInput}
          setUserInput={setUserInput}
          handleUserInput={handleUserInput}
        />
      )}
    </div>
  );
};

export default ChatBot;
