import React from 'react';
import { Card } from 'react-bootstrap';
import pokeball from '../SVG/collection-ball.svg';

const CollectionItem = ({ index, pokemon }) => {
  const renderItem = () => {
    const isUnlocked = pokemon !== null && typeof pokemon !== 'undefined';
    return (
      <Card
        className="m-2 shadow"
        bg={'dark'}
        text={'white'}
        style={{ width: '30%', height: '280px' }}
      >
        <Card.Img className="p-4" variant="top" src={isUnlocked ? pokemon.img : pokeball} />
        <Card.Body className="pt-0 ">
          <Card.Text className="text-muted mb-0">#{pokemon ? pokemon.pokemonId : index}</Card.Text>
          <Card.Text className="text-white">
            {isUnlocked ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return renderItem();
};

export default CollectionItem;
