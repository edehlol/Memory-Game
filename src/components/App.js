import React, { useState, useEffect, useReducer } from 'react';
import Gameboard from './Gameboard';
import { createDeck } from '../cards';

import '../style.css';

//TODO
// 1. Fix cardsreducer
// 2. Implement flippedcard timer
// 3. make reset deck action

const initialCards = createDeck();

const cardsReducer = (cards, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      if (
        cards.find((card) => card.id === action.payload).flipped &&
        !cards.find((card) => card.id === action.payload).guessed
      ) {
        return cards;
      } else {
        return cards.map((card) => {
          if (card.id === action.payload) {
            return card.guessed ? card : { ...card, flipped: !card.flipped };
          } else {
            return card;
          }
        });
      }
    case 'COMPARE_CARDS':
      const flippedCards = cards.filter((card) => card.flipped).filter((card) => !card.guessed);
      if (flippedCards.length === 2) {
        if (flippedCards[0].img === flippedCards[1].img) {
          return cards.map((card) => {
            if (card.flipped) {
              return { ...card, guessed: true };
            } else {
              return card;
            }
          });
        } else {
          return cards.map((card) => {
            if (card.flipped && !card.guessed) {
              return { ...card, flipped: false };
            } else {
              return card;
            }
          });
        }
      } else {
        return cards;
      }
    case 'RESET_CARDS':
      return createDeck();
    default:
      return cards;
  }
};

const App = () => {
  const [cards, cardsDispatch] = useReducer(cardsReducer, initialCards);
  useEffect(() => {}, [cards]);

  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxScore = cards.length / 2;

  const addToScore = () => {
    setScore(score + 1);
  };

  const calculateProgress = () => {
    return `${(score / maxScore) * 100}%`;
  };
  const onNewGame = () => {
    setScore(0);
    cardsDispatch({ type: 'RESET_CARDS' });
  };

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
        cardsDispatch={cardsDispatch}
        addToScore={addToScore}
        cards={cards}
        setAttempts={setAttempts}
        attempts={attempts}
      />
    </div>
  );
};
export default App;
