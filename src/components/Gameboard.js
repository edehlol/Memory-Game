import React, { useState, useEffect } from 'react';
import Card from './Card';

import correctSound from '../sounds/Conversion1.wav';
import incorrectSound from '../sounds/IMHIT_Damage.wav';

const CORRECT_COMBO = new Audio(correctSound);
const INCORRECT_COMBO = new Audio(incorrectSound);

const Gameboard = ({ addToScore, cards, addToAttempts, cardsDispatch, gameCompleted }) => {
  const [flippedCardTimeout, setFlippedCardTimeout] = useState(false);

  const flipCard = (id) => {
    if (!gameCompleted) {
      if (!flippedCardTimeout) {
        if (!cards.find((card) => card.id === id).flipped) {
          addToAttempts();
          cardsDispatch({ type: 'FLIP_CARD', payload: id });
        }
      }
    }
  };
  const compareCards = (id) => {
    const flippedCards = cards.filter((card) => card.flipped).filter((card) => !card.guessed);
    if (flippedCards.length === 1) {
      if (
        cards.find((card) => card.id === id).img === flippedCards[0].img &&
        cards.find((card) => card.id === id).id !== flippedCards[0].id
      ) {
        cardsDispatch({ type: 'COMPARE_CARDS' });
        addToScore();
        CORRECT_COMBO.play();
      } else {
        setFlippedCardTimeout(true);
        INCORRECT_COMBO.play();
        const timeout = setTimeout(() => {
          setFlippedCardTimeout(false);
          cardsDispatch({ type: 'COMPARE_CARDS' });
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  };
  const onFlipCard = (id) => {
    flipCard(id);
    compareCards(id);
  };

  const renderCards = () => {
    if (cards) {
      return cards.map((card) => {
        return <Card key={card.id} card={card} flipCard={onFlipCard} />;
      });
    }
  };

  return (
    <div className="d-flex flex-wrap mx-auto justify-content-center" style={{ maxWidth: '600px' }}>
      {cards ? (
        renderCards()
      ) : (
        <div className="spinner-border mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Gameboard;
