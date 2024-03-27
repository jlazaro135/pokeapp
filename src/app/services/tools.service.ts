import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToolService {

  getImageById(id: string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  }
}
