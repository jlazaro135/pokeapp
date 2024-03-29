export function getImageById(id: string | number):string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
}

export function getFormattedName(name: string):string {
  let hasDash = name.includes('-');
  return hasDash ? name.replaceAll('-', ' ') :  name;
}
