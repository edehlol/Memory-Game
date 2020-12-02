import React, { useEffect, useState } from 'react';

import pokeball from '../SVG/pokemon-logo.png';

const GameCompleted = ({
  gameCompleted,
  onNewGame,
  getScore,
  getTime,
  attemptMultiplier,
  highScore,
  completedMsg,
}) => {
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
    const highscore = getScore();
    if (renderedScore !== highscore) {
      const interval = setInterval(() => {
        setRenderedScore((renderedScore) => renderedScore + 1);
        if (renderedScore > 200) {
          clearInterval(interval);
        }
      }, 1);
      return () => clearInterval(interval);
    }
  }, [renderedScore, getScore]);

  return (
    <div
      className="completed-container text-center bg-dark text-white d-flex justify-content-center align-items-start"
      style={{ visibility: visibility }}
    >
      <div>
        <div className="container mt-4 mx-auto">
          <p>{completedMsg}</p>
          <p className="mb-0">score:</p>
          <h1 className="display-1">{renderedScore}</h1>
          <div className="d-flex direction-row justify-content-center">
            <div className="">
              <p>
                Multiplier: {attemptMultiplier()}{' '}
                <img className="img-fluid attempt-ball text-left" src={pokeball} alt="pokeball" />
              </p>
              <p className="text-left">highscore: {highScore}</p>
              <div className="border rounded px-1 mx-auto" style={{ width: '4em' }}>
                {getTime()}
              </div>
            </div>
          </div>

          <button className="btn btn-primary mt-4" onClick={onNewGame}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCompleted;
