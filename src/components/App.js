import React, { useState, useEffect, useReducer } from 'react';
import Gameboard from './Gameboard';
import { createCards } from '../cards';
import { cardsReducer } from '../reducers';
import { formatTime } from '../helpers';

import '../style.css';
import GameCompleted from './GameCompleted';
import Attempts from './Attempts';

//TODO

const App = () => {
  const [cards, cardsDispatch] = useReducer(cardsReducer, null);
  const [matched, setMatched] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [completedMsg, setCompletedMsg] = useState('');
  const maxScore = 8;
  const maxAttempts = 20;

  const requestCards = async () => {
    const cards = await createCards();
    cardsDispatch({
      type: 'RESET_CARDS',
      payload: cards,
    });
  };

  const addToScore = () => {
    setMatched(matched + 1);
  };
  const addToAttempts = () => {
    setAttempts(attempts + 1 / 2);
  };

  const calculateProgress = () => {
    return `${(matched / maxScore) * 100}%`;
  };
  const onNewGame = () => {
    if (gameCompleted) {
      setGameCompleted(false);
      requestCards();
      setMatched(0);
      setTimer(0);
      setCompletedMsg('');
      setAttempts(0);
    }
  };

  const getHighScore = () => {
    return Math.round(matched * ((attempts / maxAttempts) * 125));
  };
  const getAttempts = () => {
    return `${Math.floor(attempts)} / ${maxAttempts}`;
  };
  const getTime = () => {
    return formatTime(timer);
  };

  useEffect(() => {
    requestCards();
  }, []);

  useEffect(() => {
    if (!gameCompleted) {
      const interval = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [gameCompleted, setTimer, timer]);

  useEffect(() => {
    if (cards) {
      if (attempts === maxAttempts || (cards.every((card) => card.guessed) && timer > 0)) {
        setGameCompleted(true);
      }
    }
  }, [timer, cards, attempts, gameCompleted]);

  useEffect(() => {
    if (gameCompleted) {
      if (cards.every((card) => card.guessed)) {
        setCompletedMsg('You Won!');
      } else {
        setCompletedMsg('You Lost!');
      }
    }
  }, [cards, gameCompleted]);

  return (
    <div className="fluid-container mt-2">
      <Attempts />
      <div>{completedMsg}</div>
      <div className="progress mb-4" style={{ height: '20px' }}>
        <div
          className="progress-bar"
          style={{ width: calculateProgress() }}
          aria-valuenow={matched}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          Score: {matched}
          {` / ${maxScore}`}
        </div>
      </div>
      {gameCompleted && (
        <GameCompleted
          gameCompleted={gameCompleted}
          onNewGame={onNewGame}
          getHighScore={getHighScore}
          getAttempts={getAttempts}
          getTime={getTime}
        />
      )}
      <Gameboard
        cardsDispatch={cardsDispatch}
        addToScore={addToScore}
        cards={cards}
        addToAttempts={addToAttempts}
        gameCompleted={gameCompleted}
      />
      <div>timer: {getTime()}</div>
      {getAttempts()} Attempts
    </div>
  );
};
export default App;
