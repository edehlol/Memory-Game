import React, { useEffect, useState } from 'react';
import { Button, Container, Alert, Badge } from 'react-bootstrap';
import { attemptMultiplier } from '../helpers';

import pokeball from '../SVG/pokemon-logo.png';

import Collection from './Collection';

const GameCompleted = ({
  gameCompleted,
  onNewGame,
  getScore,
  getTime,
  highScore,
  completedMsg,
  onToggleCollection,
  collection,
  newCollection,
  attempts,
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
    <div>
      <Alert
        className="fixed-top mb-4"
        variant={completedMsg === 'You Won!' ? 'success' : 'danger'}
        style={{ visibility: visibility }}
      >
        {completedMsg}
      </Alert>
      <div
        className="completed-container text-center bg-dark text-white d-flex justify-content-center align-items-start pt-5"
        style={{ visibility: visibility }}
      >
        <div>
          <Container className=" my-4 mx-auto">
            <small className="text-muted mb-0 mt-5">score</small>
            <h1 className="display-1">{getScore()}</h1>
            <div className="d-flex direction-row justify-content-center ">
              <div className="">
                <small className="text-muted mb-0">multiplier</small>
                <p className="">
                  {attemptMultiplier(attempts)}{' '}
                  <img className="img-fluid attempt-ball" src={pokeball} alt="pokeball" />
                </p>
                <small className="text-muted mb-0">highscore</small>
                <p className="">{highScore}</p>
                <small className="text-muted mb-0">timer</small>
                <div className="border rounded px-1 mx-auto" style={{ width: '4em' }}>
                  {getTime()}
                </div>
              </div>
            </div>
            <div className="my-4">
              {newCollection.length > 0 && (
                <div>
                  <Badge variant="success">New</Badge>
                </div>
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
    </div>
  );
};

export default GameCompleted;
