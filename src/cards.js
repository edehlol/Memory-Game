import uniqid from 'uniqid';
import { fetchPokemon } from './apis/pokedex';

const card = (img, pokemonId, name) => {
  let flipped = false;
  let guessed = false;
  const id = uniqid();

  return { img, flipped, id, guessed, pokemonId, name };
};

export const createCards = async () => {
  let pokemons = [];
  let cards = [];
  let idList = [];
  for (let i = 0; i < 8; i++) {
    let randomId = Math.round(Math.random() * 151);
    while (idList.includes(randomId) || randomId === 0) {
      randomId = Math.round(Math.random() * 151);
    }
    idList.push(randomId);
    const response = await fetchPokemon(idList[idList.length - 1]);
    console.log(response);
    pokemons.push(response);
  }
  pokemons.forEach((pokemon) => {
    cards.push(card(pokemon.sprites.front_default, pokemon.id, pokemon.name));
    cards.push(card(pokemon.sprites.front_default, pokemon.id, pokemon.name));
  });
  return cards.sort(() => Math.random() - 0.5);
};
