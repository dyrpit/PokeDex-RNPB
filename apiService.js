export const fetchPokemonList = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPokemonDetails = async (url, signal) => {
  try {
    const response = await fetch(url, {method: 'get', signal});
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
