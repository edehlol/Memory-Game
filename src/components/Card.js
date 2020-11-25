import React, { useState, useEffect } from 'react';
import cardFront from '../SVG/logo512.png';

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
      className="card-container m-2"
      style={{ width: '20%', height: '20%', transform: `rotateY(${rotate}deg)` }}
      onClick={onCardClick}
    >
      <div className="card-flip card " style={{ transform: rotate }}>
        <div className="card-back bg-dark rounded">
          <img src={card.img} className="img-fluid" alt="cardback" />
        </div>
        <div className="card-front bg-dark rounded">
          <img src={cardFront} className="img-fluid" alt="card front" />
        </div>
      </div>
    </div>
  );
};

export default Card;
