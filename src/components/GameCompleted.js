import React, { useEffect, useState } from 'react';

const GameCompleted = ({ gameCompleted, onNewGame, getHighScore, getTime, getAttempts }) => {
  const [visibility, setVisibility] = useState('hidden');
  const [renderedScore, setRenderedScore] = useState(0);
  useEffect(() => {
    if (gameCompleted) {
      const timeout = setTimeout(() => {
        setVisibility('visible');
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [gameCompleted]);

  useEffect(() => {
    const highscore = getHighScore();
    if (renderedScore !== highscore) {
      const interval = setInterval(() => {
        setRenderedScore((renderedScore) => renderedScore + 1);
        if (renderedScore > 200) {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [renderedScore]);

  return (
    <div
      className="completed-container text-center bg-dark text-white"
      style={{ visibility: visibility }}
    >
      <div>
        <div>{getAttempts()}</div>
        <p className="mb-0">score:</p>
        <h1 className="display-1">{renderedScore}</h1>
        <div>timer: {getTime()}</div>
        <button className={` btn btn-primary`} onClick={onNewGame}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameCompleted;
