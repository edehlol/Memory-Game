import uniqid from 'uniqid';
import { fetchPokemon } from './apis/pokedex';

let pok = fetchPokemon();
console.log(pok);

const card = (img) => {
  let flipped = false;
  let guessed = false;
  const id = uniqid();

  return { img, flipped, id, guessed };
};

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1920px-Vue.js_Logo_2.svg.png',
  'https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png',
  'https://i.imgur.com/k0IGUXx.jpg',
  'https://ca-times.brightspotcdn.com/dims4/default/22fc870/2147483647/strip/true/crop/960x539+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc9%2F98%2Ffa3b0cb001e3541c5818a89cd5cc%2Fla-1475087498-snap-photo',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZVIa2ZmNJ9yY8xo0-HbtX4xEjgX2H6s48g&usqp=CAU',
  'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/111676204/original/f810e2ab0c5d7b9b4cd63a2120120c53e30c9e2f/find-you-a-meme-based-on-your-story.jpg',
  'http://www.mandysam.com/img/random.jpg',
];

export const createDeck = () => {
  let pokemons = [];
  const test = async () => {
    let response = await fetchPokemon();
    return response;
  };
  for (let i = 0; i < 5; i++) {
    pokemons.push(test());
  }

  console.log(pokemons);
  let deck = [];
  images.forEach((img) => {
    deck.push(card(img));
    deck.push(card(img));
  });

  return deck.sort(() => Math.random() - 0.5);
};
