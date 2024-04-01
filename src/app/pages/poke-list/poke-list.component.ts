import { CommonModule } from '@angular/common';
import { Component, ElementRef, computed, effect, inject, signal } from '@angular/core';
import { delay, map } from 'rxjs';

import { RequestService } from '../../services/request.service';
import { dataService } from '../../services/data.service';
import { PokeListService } from './services/poke-list.service';

import {
  PokeCardComponent,
  PokeSearchComponent,
  PokePaginationButtonsComponent,
  PokePagiantionInfoComponent,
  PokeEmptyListComponent,
} from './components';

import { PokeSpinnerComponent } from '../../shared/poke-spinner/poke-spinner.component';
import { scrollToTop } from '../../helpers/helpers';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    CommonModule,
    PokeCardComponent,
    PokeSearchComponent,
    PokePaginationButtonsComponent,
    PokePagiantionInfoComponent,
    PokeEmptyListComponent,
    PokeSpinnerComponent,
  ],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css',
})
export default class PokeListComponent {
  public request = inject(RequestService);
  public data = inject(dataService);
  public pokeListService = inject(PokeListService);

  elementRef: ElementRef = inject(ElementRef);

  // searchTerm = signal<string>('');
  searchTerm = computed(() => {
    return {
      isTerm: Boolean(this.pokeListService.searchTerm()),
      term: this.pokeListService.searchTerm()
    }
  });
  dataIsLoaded = computed(() => Boolean(this.data.listData()));
  pagination = computed(() => this.pokeListService.pagination());
  pokemons = computed(() => this.pokeListService.pokemons());

  ngOnInit() {
    this.initPokemonList();
  }


  initPokemonList() {
    if (this.dataIsLoaded()) {
      this.getCurrentStatusData();
      return
    }

    this.request
      .getPokemons()
      .pipe(
        map((response) => this.pokeListService.updateResultWithImage(response)),
        delay(900)
      )
      .subscribe((response) => {

        this.pokeListService.setDataFromApi(response)
      });
  }

  getCurrentStatusData(){
    this.pokeListService.setData(this.data.listData());
    if(this.searchTerm().isTerm){
      this.searchPokemon(this.searchTerm().term)
    }
  }

  searchPokemon(searchTerm: string) {
    this.pokeListService.searchTerm.set(searchTerm);
    this.pokeListService.searchPokemon(searchTerm);
  }

  handleAction(action: string) {
    scrollToTop(this.elementRef);
    this.pokeListService.handleAction(action);
  }
}
