import uniqid from 'uniqid';
import { fetchPokemon } from './apis/pokedex';

const card = (img, pokemonId) => {
  let flipped = false;
  let guessed = false;
  const id = uniqid();

  return { img, flipped, id, guessed, pokemonId };
};

export const createCards = async () => {
  let images = [];
  let cards = [];
  let idList = [];
  for (let i = 0; i < 1; i++) {
    let randomId = Math.round(Math.random() * 151);
    while (idList.includes(randomId) || randomId === 0) {
      randomId = Math.round(Math.random() * 151);
    }
    idList.push(randomId);
    const response = await fetchPokemon(idList[idList.length - 1]);
    images.push(response.sprites.front_default);
  }
  images.forEach((img) => {
    cards.push(card(img));
    cards.push(card(img));
  });
  return cards.sort(() => Math.random() - 0.5);
};
