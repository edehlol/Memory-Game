import React from 'react';

import Attempts from './Attempts';

const GameInfo = ({ attempts, maxAttempts, matched, calculateProgress, getTime }) => {
  return (
    <div className="container" style={{ maxWidth: '535px' }}>
      <small className="text-muted">Completed {matched}/8</small>
      <div className="progress" style={{ height: '32px' }}>
        <div
          className="progress-bar"
          style={{ width: calculateProgress() }}
          aria-valuenow={matched}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div className="d-flex direction-row justify-content-between mt-1">
        <Attempts attempts={attempts} maxAttempts={maxAttempts} />
        <div className="text-white " style={{ paddingTop: '2px' }}>
          <div className="border rounded px-1">{getTime()}</div>
        </div>
      </div>
    </div>
  );
};
export default GameInfo;
