import React from 'react';
import confused from '../sounds/Confused2.wav';

const Attempts = () => {
  const sound = new Audio(confused);
  const test = () => {
    if (sound.paused) {
      sound.play();
    }
  };
  return (
    <div>
      <div>atetem</div>
      <button onClick={test}>Click</button>
    </div>
  );
};

export default Attempts;
