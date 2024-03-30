import { Ability, Stat, Type } from "./pokeDetailsResponse.interface";

export interface PokeData {
  abilities:                Ability[];
  base_experience:          number;
  height:                   string;
  id:                       number;
  name:                     string;
  formattedName:            string;
  types:                    Type[];
  weight:                   string;
  image:                    string;
  stats:                    Stat[];
}

