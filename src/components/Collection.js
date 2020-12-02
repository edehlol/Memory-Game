import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import hiddenCard from '../SVG/question-circle.svg';

import CollectionItem from './CollectionItem';

const Collection = ({ collection }) => {
  const renderCollection = () => {
    return [...collection].map((pokemon, index) => {
      return index === 0 ? null : (
        <React.Fragment key={index}>
          <CollectionItem index={index} hiddenCard={hiddenCard} pokemon={pokemon} />
        </React.Fragment>
      );
    });
  };
  return (
    <Container fluid>
      <div className="d-flex flex-wrap my-0 w-100">{renderCollection()}</div>
    </Container>
  );
};

export default Collection;
