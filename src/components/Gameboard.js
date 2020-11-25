import React, { useState, useEffect } from 'react';
import Card from './Card';

const Gameboard = ({ addToScore, cards, onSetCards, setAttempts, attempts }) => {
  const [flippedCardTimeout, setFlippedCardTimeout] = useState(false);

  const flipCard = (id) => {
    if (
      (cards.find((card) => card.id === id).flipped &&
        !cards.find((card) => card.id === id).guessed) ||
      flippedCardTimeout
    ) {
      return cards;
    } else {
      onSetCards(
        cards.map((card) => {
          if (card.id === id) {
            return card.guessed ? card : { ...card, flipped: !card.flipped };
          } else {
            return card;
          }
        })
      );
    }
  };

  //   COMPARE CARDS
  useEffect(() => {
    let flippedCards = cards.filter((card) => card.flipped).filter((card) => !card.guessed);
    if (flippedCards.length === 2) {
      if (flippedCards[0].img === flippedCards[1].img) {
        onSetCards(
          cards.map((card) => {
            if (card.flipped) {
              return { ...card, guessed: true };
            } else {
              return card;
            }
          })
        );
        addToScore();
      } else {
        setFlippedCardTimeout(true);
        let timeout = setTimeout(() => {
          onSetCards(
            cards.map((card) => {
              if (card.flipped && !card.guessed) {
                return { ...card, flipped: false };
              } else {
                return card;
              }
            })
          );

          setFlippedCardTimeout(false);
        }, 1000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [addToScore, attempts, cards, setAttempts, onSetCards]);

  const renderCards = () => {
    return cards.map((card) => {
      return <Card key={card.id} card={card} flipCard={flipCard} />;
    });
  };

  return (
    <div className="d-flex flex-wrap" style={{ maxWidth: '600px' }}>
      {renderCards()}
    </div>
  );
};

export default Gameboard;
