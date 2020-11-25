import React, { useState, useEffect, useReducer } from 'react';
import Gameboard from './Gameboard';
import { createDeck } from '../cards';

import '../style.css';

const App = () => {
  const initialCards = { cards: createDeck() };

  const cardsReducer = (state, action) => {
    switch (action.type) {
      case 'FLIP_CARD':
        console.log(state);
        return state;
      default:
        return state;
    }
  };

  // const [cards, cardsDispatch] = useReducer(cardsReducer, initialCards);

  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxScore = cards.length / 2;

  const addToScore = () => {
    setScore(score + 1);
  };

  const calculateProgress = () => {
    return `${(score / maxScore) * 100}%`;
  };

  const onSetCards = (cards) => {
    setCards(cards);
  };
  const onNewGame = () => {
    setScore(0);
    setCards(createDeck());
  };

  useEffect(() => {
    setCards(createDeck());
  }, [setCards]);

  return (
    <div className="fluid-container mt-2">
      {attempts} / 15
      <div className="progress mb-4" style={{ height: '40px' }}>
        <div
          className="progress-bar"
          style={{ width: calculateProgress() }}
          aria-valuenow={score}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          Score: {score}
          {` / ${maxScore}`}
        </div>
      </div>
      <button className=" btn btn-primary" onClick={onNewGame}>
        New Game
      </button>
      <Gameboard
        addToScore={addToScore}
        cards={cards}
        onSetCards={onSetCards}
        setAttempts={setAttempts}
        attempts={attempts}
      />
    </div>
  );
};
export default App;
