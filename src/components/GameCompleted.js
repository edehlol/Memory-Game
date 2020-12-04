import React, { useEffect, useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';

import pokeball from '../SVG/pokemon-logo.png';
import exclamation from '../SVG/exclamation-circle.svg';

import Collection from './Collection';

const GameCompleted = ({
  gameCompleted,
  onNewGame,
  getScore,
  getTime,
  attemptMultiplier,
  highScore,
  completedMsg,
  onToggleCollection,
  collection,
  newCollection,
}) => {
  const [visibility, setVisibility] = useState('hidden');

  const renderNewCollection = () => {
    if (newCollection.length > 0) {
      return newCollection.map((item, index) => {
        return <img src={item.img} alt="gg" key={index} />;
      });
    }
  };

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

  return (
    <div
      className="completed-container text-center bg-dark text-white d-flex justify-content-center align-items-start"
      style={{ visibility: visibility }}
    >
      <Alert className="fixed-top" variant={completedMsg === 'You Won!' ? 'success' : 'danger'}>
        {completedMsg}
      </Alert>
      <div>
        <Container className=" my-4 mx-auto">
          <p className="mb-0">score:</p>
          <h1 className="display-1">{getScore()}</h1>
          <div className="d-flex direction-row justify-content-center ">
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
          <div className="my-4">
            {newCollection.length > 0 && (
              <p className="mb-0 d-flex align-items-center justify-content-center">
                <img src={exclamation} alt="exclamation" className="mr-1" />
                <span>New</span>
              </p>
            )}
            {renderNewCollection()}
          </div>
          <Button variant="primary" sticky="top" className="mt-4" onClick={onNewGame}>
            Play Again
          </Button>
        </Container>

        <Collection collection={collection} onToggleCollection={onToggleCollection} />
      </div>
    </div>
  );
};

export default GameCompleted;
