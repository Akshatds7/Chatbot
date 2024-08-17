import React from 'react';

const InputBox = ({ userInput, setUserInput, handleUserInput }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserInput(userInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default InputBox;
