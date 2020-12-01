import React, { useState, useEffect, useReducer } from 'react';
import Gameboard from './Gameboard';
import { createCards } from '../cards';
import { cardsReducer } from '../reducers';
import { formatTime } from '../helpers';

import '../style.css';
import GameInfo from './GameInfo';
import GameCompleted from './GameCompleted';

import logo from '../SVG/pokemon-logo.svg';

//TODO

const App = () => {
  const [cards, cardsDispatch] = useReducer(cardsReducer, null);
  const [matched, setMatched] = useState(0);
  const [attempts, setAttempts] = useState(20);
  const [timer, setTimer] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [completedMsg, setCompletedMsg] = useState('');
  const maxScore = 8;
  const maxAttempts = 20;

  const requestCards = async () => {
    const cards = await createCards();
    cardsDispatch({
      type: 'RESET_CARDS',
      payload: cards,
    });
  };

  const addToScore = () => {
    setMatched(matched + 1);
  };
  const addToAttempts = () => {
    console.log(attempts);
    setAttempts(attempts - 0.5);
  };

  const calculateProgress = () => {
    return `${(matched / maxScore) * 100}%`;
  };

  const onNewGame = () => {
    if (gameCompleted) {
      setGameCompleted(false);
      requestCards();
      setMatched(0);
      setTimer(0);
      setCompletedMsg('');
      setAttempts(maxAttempts);
    }
  };

  const getHighScore = () => {
    return Math.round(matched * ((attempts / maxAttempts) * 125));
  };
  const getAttempts = () => {
    return `${Math.round(attempts)} / ${maxAttempts}`;
  };
  const getTime = () => {
    return formatTime(timer);
  };

  useEffect(() => {
    requestCards();
  }, []);

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
    if (cards) {
      if (attempts === 0 || (cards.every((card) => card.guessed) && timer > 2)) {
        setGameCompleted(true);
      }
    }
  }, [timer, cards, attempts, gameCompleted]);

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
    <div className="fluid-container">
      <div className=" bg-dark pt-3 pb-0 mb-4">
        <div className=" container row mx-auto">
          <div className="col-md-2 text-center mb-4">
            <img src={logo} className="img-fluid logo mt-2" alt="logo" />
          </div>
          <div className="col-md-8 px-0">
            <GameInfo
              attempts={attempts}
              maxAttempts={maxAttempts}
              matched={matched}
              maxScore={maxScore}
              calculateProgress={calculateProgress}
              getTime={getTime}
            />
          </div>
        </div>
      </div>

      {gameCompleted && (
        <GameCompleted
          gameCompleted={gameCompleted}
          onNewGame={onNewGame}
          getHighScore={getHighScore}
          getAttempts={getAttempts}
          getTime={getTime}
          completedMsg={completedMsg}
        />
      )}
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
