import React, { useEffect, useState } from 'react';
import { Button, Accordion, Card, Container } from 'react-bootstrap';

import pokeball from '../SVG/pokemon-logo.png';

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
}) => {
  const [visibility, setVisibility] = useState('hidden');

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
      <div>
        <Container className=" my-4 mx-auto">
          <p>{completedMsg}</p>
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

          <Button variant="primary" sticky="top" className="mt-4" onClick={onNewGame}>
            Play Again
          </Button>
        </Container>

        <Accordion>
          <Card bg={'dark'} className="mx-0">
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                My Collection
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Collection collection={collection} onToggleCollection={onToggleCollection} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default GameCompleted;
