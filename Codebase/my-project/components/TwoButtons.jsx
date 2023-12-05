// TwoButtons.js
import React from 'react';

const TwoButtons = () => {
  const handleButtonClick = (direction) => {
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
      <div style={{ display: 'flex' }}>
        <button className="button" onClick={() => handleButtonClick('left')}>← Prev</button>
        <button className="button" onClick={() => handleButtonClick('right')}>Next →</button>
        <br/>
      </div>
    </div>
  );
};

export default TwoButtons;
