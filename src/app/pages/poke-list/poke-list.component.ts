import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { RequestService } from '../../services/request.service';
import { ToolService } from '../../services/tools.service';

import { PokeCardComponent } from './components/poke-card/poke-card.component';

import { getImageById } from '../../helpers/helpers';
import { CustomPokemon, PokemonList } from '../../interfaces';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [PokeCardComponent],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss',
})
export default class PokeListComponent {
  public request = inject(RequestService);
  public tools = inject(ToolService);

  public pokemons: CustomPokemon[] = [];

  ngOnInit() {
    this.request
      .getPokemons()
      .pipe(map((response) => this.updateResultWithImage(response)))
      .subscribe((response) => {
        const { results } = response;

        this.pokemons = results;
      });
  }

  updateResultWithImage(response: PokemonList) {
    const updatedResults = response.results.map((result) => {
      const urlParts = result.url.split('/');
      const id = urlParts[urlParts.length - 2];
      return {
        ...result,
        id: id,
        image: getImageById(id),
      };
    });
    return {
      ...response,
      results: updatedResults,
    };
  }
}
