import React, { useState, useEffect, useReducer } from 'react';
import Gameboard from './Gameboard';
import GameCompleted from './GameCompleted';
import { createDeck } from '../cards';
import { cardsReducer } from '../reducers';
import { formatTime } from '../helpers';

import '../style.css';
import { fetchPokemon } from '../apis/pokedex';

//TODO

const initialCards = createDeck();

const App = () => {
  const [cards, cardsDispatch] = useReducer(cardsReducer, initialCards);
  const [matched, setMatched] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxScore = cards.length / 2;
  const maxAttempts = 20;
  const [timer, setTimer] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [completedMsg, setCompletedMsg] = useState('');

  useEffect(() => {
    const requestCards = async () => {
      const cards = await fetchPokemon();
      cardsDispatch({
        type: 'RESET',
        payload: cards,
      });
    };
    requestCards();
  }, []);

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
      setMatched(0);
      setAttempts(0);
      setTimer(0);
      setGameCompleted(false);
      setCompletedMsg('');
      cardsDispatch({ type: 'RESET_CARDS', payload: createDeck() });
    }
  };

  const getHighScore = () => {
    return matched * ((attempts / maxAttempts) * 125);
  };

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
    if (attempts === maxAttempts || cards.every((card) => card.guessed === true)) {
      setGameCompleted(true);
    }
  }, [cards, attempts]);

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
      score: {getHighScore()}
      <div>{completedMsg}</div>
      <div>timer: {formatTime(timer)}</div>
      {Math.floor(attempts)} / {maxAttempts} Attempts
      <div className="progress mb-4" style={{ height: '40px' }}>
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
      <button
        className={` btn ${gameCompleted ? `btn-primary` : 'btn-secondary'}`}
        onClick={onNewGame}
      >
        New Game
      </button>
      <GameCompleted />
      <Gameboard
        cardsDispatch={cardsDispatch}
        addToScore={addToScore}
        cards={cards}
        addToAttempts={addToAttempts}
        gameCompleted={gameCompleted}
      />
    </div>
  );
};
export default App;
