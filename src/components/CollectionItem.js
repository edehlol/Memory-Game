import React from 'react';
import { Card } from 'react-bootstrap';

const CollectionItem = ({ index, hiddenCard, pokemon }) => {
  const renderItem = () => {
    const isUnlocked = typeof pokemon !== 'undefined';
    return (
      <Card className="m-2" style={{ width: '20%' }}>
        <Card.Img variant="top" src={isUnlocked ? pokemon.img : hiddenCard} />
        <Card.Body>
          <Card.Text className="text-muted">#{index}</Card.Text>
          <Card.Title className="text-body">
            {isUnlocked ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : ''}
          </Card.Title>
        </Card.Body>
      </Card>
    );
    // if (typeof pokemon === 'undefined') {
    //   return (
    //     <Card.Body>
    //       <img
    //         src={hiddenCard}
    //         className="card-img-top pt-2"
    //         alt="hidden"
    //         style={{ width: '50px', height: 'auto' }}
    //       />
    //       <div className="card-body">
    //         <p className="mb-0 card-title">{`#${index}`}</p>
    //       </div>
    //     </Card.Body>
    //   );
    // } else {
    //   return (
    //     <Card.Body>
    //       <img className="card-img-top" src={pokemon.img} alt="ll" />
    //     </Card.Body>
    //   );
    // }
  };
  return (
    // <Card className={'m-2'} style={{ width: '20%' }}>
    //   <div key={index} className="col-6" style={{ width: '20%', height: '8rem' }}>
    renderItem()
    //   </div>
    // </Card>
  );
};

export default CollectionItem;
