import React, { useState, useEffect } from 'react';
import cardFront from '../SVG/question.svg';

const Card = ({ card, flipCard }) => {
  const [rotate, setRotate] = useState('0');

  useEffect(() => {
    card.flipped ? setRotate('180') : setRotate('0');
  }, [card.flipped]);

  const onCardClick = () => {
    flipCard(card.id);
  };
  return (
    <div
      className="card-container m-1 "
      style={{
        width: '20%',
        height: 'auto',
        minWidth: '30px',
        transform: `rotateY(${rotate}deg) rotate(360deg)`,
      }}
      onClick={onCardClick}
    >
      <div className="card-flip card card-img bg-dark" style={{ transform: rotate }}>
        <div className="card-back rounded mx-auto my-auto">
          <img src={card.img} className="img-fluid mx-auto" alt="cardback" />
        </div>
        <div className="card-front bg-dark rounded card-img mx-auto my-auto">
          <img src={cardFront} className="img-fluid px-4 py-4" alt="card front" />
        </div>
      </div>
    </div>
  );
};

export default Card;
