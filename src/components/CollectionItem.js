import React from 'react';
import { Card } from 'react-bootstrap';
import pokeball from '../SVG/pokemon-logo.png';

const CollectionItem = ({ index, pokemon }) => {
  const renderItem = () => {
    const isUnlocked = pokemon !== null && typeof pokemon !== 'undefined';
    return (
      <Card className="m-2" style={{ width: '20%', height: '180px' }}>
        <Card.Img variant="top" src={isUnlocked ? pokemon.img : pokeball} />
        <Card.Body className="pt-0">
          <Card.Text className="text-muted mb-0">#{index}</Card.Text>
          <Card.Text className="text-body">
            {isUnlocked ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return renderItem();
};

export default CollectionItem;
