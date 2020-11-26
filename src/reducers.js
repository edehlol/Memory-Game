export const cardsReducer = (cards, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      if (
        cards.find((card) => card.id === action.payload).flipped &&
        !cards.find((card) => card.id === action.payload).guessed
      ) {
        return cards;
      } else {
        return cards.map((card) => {
          if (card.id === action.payload) {
            return card.guessed ? card : { ...card, flipped: !card.flipped };
          } else {
            return card;
          }
        });
      }
    case 'COMPARE_CARDS':
      const flippedCards = cards.filter((card) => card.flipped).filter((card) => !card.guessed);
      if (flippedCards.length === 2) {
        if (flippedCards[0].img === flippedCards[1].img) {
          return cards.map((card) => {
            if (card.flipped) {
              return { ...card, guessed: true };
            } else {
              return card;
            }
          });
        } else {
          return cards.map((card) => {
            if (card.flipped && !card.guessed) {
              return { ...card, flipped: false };
            } else {
              return card;
            }
          });
        }
      } else {
        return cards;
      }
    case 'RESET_CARDS':
      return action.payload;
    default:
      return cards;
  }
};
