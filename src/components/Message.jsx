import React from 'react';

const Message = ({ message, metadata, isUser, handleButtonClick }) => {
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <p>{message}</p>
      {!isUser && metadata?.payload && metadata.payload.map((item, index) => (
        <div key={index}>
          {item.type === 'gif' && (
            <img src={item.url} alt={item.caption || 'GIF'} />
          )}
          {item.label && (
            <button onClick={() => handleButtonClick(item.trigger, item.label)}>
              {item.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Message;
