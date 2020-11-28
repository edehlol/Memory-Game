import React, { useEffect, useState } from 'react';

const GameCompleted = ({ gameCompleted, onNewGame, getHighScore, getTime, getAttempts }) => {
  const [visibility, setVisibility] = useState('none');

  useEffect(() => {
    if (gameCompleted) {
      const visible = 'visible';
      const timeout = setTimeout(() => {
        setVisibility(visible);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [gameCompleted]);

  return (
    <div className="completed-container text-center" style={{ visibility: visibility }}>
      <div>
        score: {getHighScore()} <div>timer: {getTime()}</div>
        <div>{getAttempts()}</div>
        <button className={` btn btn-primary`} onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameCompleted;
