export const setBackground = type => {
  switch (type) {
    case 'grass':
      return '#90EE90';
    case 'fire':
      return '#FF6347';
    case 'water':
      return '#E0FFFF';
    case 'electric':
      return '#FFD700';
    case 'psychic':
      return '#EE82EE';
    case 'ice':
      return '#EE82EE';
    case 'dragon':
      return '#6A5ACD';
    case 'dark':
      return '#808080';
    case 'fairy':
      return '#FFB6C1';
    case 'normal':
      return '#FFE4C4';
    case 'fighting':
      return '#A52A2A';
    case 'flying':
      return '#AFEEEE';
    case 'poison':
      return '#DDA0DD';
    case 'ground':
      return '#DEB887';
    case 'rock':
      return '#D2691E';
    case 'bug':
      return '#9ACD32';
    case 'ghost':
      return '#6A5ACD';
    case 'steel':
      return '#C0C0C0';
    default:
      return 'white';
  }
};
