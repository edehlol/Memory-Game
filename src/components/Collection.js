import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Dropdown } from 'react-bootstrap';

import CollectionItem from './CollectionItem';

const Collection = ({ collection }) => {
  const [filteredList, setFilteredList] = useState(true);
  const [dropdownText, setDropdownText] = useState('Unlocked');

  const onFilterCollection = (isFiltered) => {
    setFilteredList(isFiltered ? true : false);
  };

  const formatCompleted = () => {
    return `${collection.filter((item) => item !== null).length} / ${
      collection.length - 1
    } Unlocked (${Math.round(
      (collection.filter((item) => item !== null).length / (collection.length - 1)) * 100
    )}%)`;
  };

  useEffect(() => {
    setDropdownText(filteredList ? 'Show Unlocked' : 'Show All');
  }, [filteredList]);

  const renderCollection = () => {
    const filteredCollection = filteredList
      ? collection.filter((item) => item !== null)
      : collection;
    console.log(collection.filter((item) => item !== null));
    return [...filteredCollection].map((pokemon, index) => {
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
            <div
              className="d-flex justify-content-between mx-auto align-items-center my-4"
              style={{ maxWidth: '600px' }}
            >
              <p className="my-0 ml-3">{formatCompleted()}</p>
              <Dropdown className="mr-3">
                <Dropdown.Toggle className="bg-dark border-secondary">
                  {dropdownText}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className={filteredList ? 'font-weight-bold' : 'font-weight-normal'}
                    onClick={() => onFilterCollection(true)}
                  >
                    Show Unlocked
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={filteredList ? 'font-weight-normal' : 'font-weight-bold'}
                    onClick={() => onFilterCollection(false)}
                  >
                    Show All
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div
              className="d-flex justify-content-center mb-4"
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
