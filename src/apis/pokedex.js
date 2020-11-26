import axios from 'axios';

export const fetchPokemon = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/12/');
  return response.data.sprites.front_default;
};
