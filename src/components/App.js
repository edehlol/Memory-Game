import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Gameboard from './Gameboard';
import { createCards } from '../cards';
import { cardsReducer } from '../reducers';
import { formatTime } from '../helpers';
import { useCollection } from '../hooks';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

import GameInfo from './GameInfo';
import GameCompleted from './GameCompleted';

import logo from '../SVG/pokemon-logo.svg';

const App = () => {
  const maxScore = 8;
  const maxAttempts = 20;

  const [cards, cardsDispatch] = useReducer(cardsReducer, null);
  const [collection, setCollection] = useCollection('collection', Array(156));

  const [matched, setMatched] = useState(0);
  const [attempts, setAttempts] = useState(maxAttempts);
  const [timer, setTimer] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [completedMsg, setCompletedMsg] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [displayCollection, setDisplayCollection] = useState(false);
  const [newCollection, setNewCollection] = useState([]);

  const requestCards = async () => {
    const cards = await createCards();
    cardsDispatch({
      type: 'RESET_CARDS',
      payload: cards,
    });
  };

  const addToMatched = () => {
    setMatched(matched + 1);
  };
  const addToAttempts = () => {
    setAttempts(attempts - 0.5);
  };

  const onNewGame = () => {
    if (gameCompleted) {
      setGameCompleted(false);
      requestCards();
      setMatched(0);
      setTimer(0);
      setCompletedMsg('');
      setAttempts(maxAttempts);
      setNewCollection([]);
    }
  };
  const onToggleCollection = () => {
    setDisplayCollection(!displayCollection);
  };

  const getScore = useCallback(() => {
    return Math.round(matched * Math.floor(attempts / 2) * 125);
  }, [matched, attempts]);

  const getAttempts = () => {
    return `${Math.round(attempts)} / ${maxAttempts}`;
  };

  const getTime = () => {
    return formatTime(timer);
  };

  useEffect(() => {
    setScore(getScore());
  }, [matched, getScore]);
  useEffect(() => {
    if (gameCompleted) {
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [gameCompleted, matched, highScore, score]);
  useEffect(() => {
    requestCards();
  }, []);

  useEffect(() => {
    const addToCollection = () => {
      const flippedCards = cards.filter((card) => card.guessed);
      const updatedCollection = [...collection];

      flippedCards.forEach((card) => {
        if (
          updatedCollection[card.pokemonId] === null ||
          typeof updatedCollection[card.pokemonId] === 'undefined'
        ) {
          setNewCollection((newCollection) => [...newCollection, card]);
          updatedCollection[card.pokemonId] = card;
        }
      });
      setCollection(updatedCollection);
    };
    if (gameCompleted) {
      addToCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCompleted]);

  useEffect(() => {
    if (!gameCompleted) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [gameCompleted, setTimer, timer]);

  useEffect(() => {
    if (cards) {
      if (attempts === 0 || (cards.every((card) => card.guessed) && matched > 0)) {
        setGameCompleted(true);
      }
    }
  }, [timer, cards, attempts, matched]);

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
          <div className="col-md-2 text-center my-auto">
            <img src={logo} className="img-fluid logo mb-4" alt="logo" />
          </div>
          <div className="col-md-8 px-0">
            <GameInfo
              attempts={attempts}
              maxAttempts={maxAttempts}
              matched={matched}
              maxScore={maxScore}
              getTime={getTime}
            />
          </div>
        </div>
      </div>

      {gameCompleted && (
        <GameCompleted
          gameCompleted={gameCompleted}
          onNewGame={onNewGame}
          getScore={getScore}
          highScore={highScore}
          getAttempts={getAttempts}
          getTime={getTime}
          completedMsg={completedMsg}
          attempts={attempts}
          maxAttempts={maxAttempts}
          onToggleCollection={onToggleCollection}
          collection={collection}
          newCollection={newCollection}
        />
      )}
      <Gameboard
        cardsDispatch={cardsDispatch}
        addToMatched={addToMatched}
        cards={cards}
        addToAttempts={addToAttempts}
        gameCompleted={gameCompleted}
      />
    </div>
  );
};
export default App;
