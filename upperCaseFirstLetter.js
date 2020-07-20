export const firstLetterUpperCase = word => {
  return (upperCasedLetter = word
    .split('')
    .map((letter, index) => {
      if (!index) {
        return letter.toUpperCase();
      }
      return letter;
    })
    .join(''));
};
