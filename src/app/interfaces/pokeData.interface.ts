export interface PokeData {
  abilities:                Ability[];
  base_experience:          number;
  height:                   number;
  id:                       number;
  name:                     string;
  types:                    Type[];
  weight:                   number;
  image:                    string;
}

interface Ability {
  ability:   Species;
  is_hidden: boolean;
  slot:      number;
}

interface Species {
  name: string;
  url:  string;
}

interface Type {
  slot: number;
  type: Species;
}
