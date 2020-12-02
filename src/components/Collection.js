import React, { useState } from 'react';
import { Accordion, Card, Button, Dropdown } from 'react-bootstrap';

import CollectionItem from './CollectionItem';

const Collection = ({ collection }) => {
  const [filteredList, setFilteredList] = useState(false);

  const onFilteredListClick = () => {};

  const renderCollection = () => {
    return [...collection].map((pokemon, index) => {
      return index === 0 ? null : (
        <React.Fragment key={index}>
          <CollectionItem index={index} pokemon={pokemon} />
        </React.Fragment>
      );
    });
  };
  return (
    <Accordion>
      <Card bg={'dark'} className="mx-0">
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            My Collection
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-0">
            <Dropdown>
              <Dropdown.Toggle>test</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Show All</Dropdown.Item>
                <Dropdown.Item>Show Unlocked</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div
              className="d-flex justify-content-center"
              style={{ width: '100vw', height: '100%' }}
            >
              <div
                className="d-flex flex-wrap justify-content-center"
                style={{ maxWidth: '600px' }}
              >
                {renderCollection()}
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Collection;
