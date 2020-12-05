import React from 'react';
import pokeball from '../SVG/pokemon-logo.png';

const Attempts = ({ attempts, maxAttempts }) => {
  const renderAttempts = () => {
    let renderedAttempts = [];
    const getOpacity = (counter) => {
      if (attempts <= counter - 1 && attempts > counter - 2) {
        return '50%';
      } else if (attempts <= counter - 2) {
        return '0%';
      }
    };

    for (let i = 1; i < maxAttempts + 1; i++) {
      if (i % 2 === 0) {
        renderedAttempts.push(
          <div key={i}>
            <img
              className="img-fluid attempt-ball"
              src={pokeball}
              alt="pokeball"
              style={{ opacity: getOpacity(i), width: '20px', height: '20px' }}
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
