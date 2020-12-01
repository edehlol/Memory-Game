import React from 'react';
import pokeball from '../SVG/pokemon-logo.png';

const Attempts = ({ attempts, maxAttempts }) => {
  const getOpacity = (counter) => {
    if (attempts <= counter - 1 && attempts > counter - 2) {
      return '50%';
    } else if (attempts <= counter - 2) {
      return '0%';
    }
  };
  const renderAttempts = () => {
    let renderedAttempts = [];

    for (let i = 1; i < maxAttempts + 1; i++) {
      if (i % 2 === 0) {
        renderedAttempts.push(
          <div key={i}>
            <img
              className="img-fluid attempt-ball"
              src={pokeball}
              alt="pokeball"
              style={{ opacity: getOpacity(i) }}
            />
          </div>
        );
      }
    }
    return renderedAttempts;
  };
  return <div className="d-flex direction-row mb-4">{renderAttempts()}</div>;
};

export default Attempts;
