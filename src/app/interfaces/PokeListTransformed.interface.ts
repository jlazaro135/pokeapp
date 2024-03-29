import { PokeListResponse } from "./pokeListResponse.interface";

export interface PokeListTransformed extends PokeListResponse{
  results: CustomPokemon[],
}

export interface CustomPokemon {
  name: string;
  formattedName: string;
  url:  string;
  image: string;
  id: string;
}
