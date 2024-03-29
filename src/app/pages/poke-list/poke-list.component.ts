import { Component, inject, signal } from '@angular/core';
import { map } from 'rxjs';

import { RequestService } from '../../services/request.service';
import { ToolService } from '../../services/tools.service';

import {
  CustomPokemon,
  PokeListResponse,
  PokeListTransformed,
  PokePagination,
} from '../../interfaces';

import {
  PokeCardComponent,
  PokeSearchComponent,
  PokePaginationComponent,
} from './components';

import { getFormattedName, getImageById } from '../../helpers/helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    CommonModule,
    PokeCardComponent,
    PokeSearchComponent,
    PokePaginationComponent,
  ],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss',
})
export default class PokeListComponent {
  public request = inject(RequestService);
  public tools = inject(ToolService);

  public pokemons = signal<CustomPokemon[]>([]);
  public originalPokemosData: CustomPokemon[] = [];
  public filteredPokemons: CustomPokemon[] = [];
  public startItem: number = 0;
  public endItem!: number;
  public itemsToShow: CustomPokemon[] = [];
  public pagination = signal<PokePagination>({
    items: 0,
    itemsPerPage: 200,
    pageNumber: 1,
    pages: 0,
    isFirstPage: true,
    isLastPage: false,
  });

  ngOnInit() {
    this.initPokemonList();
  }

  initPokemonList() {
    this.request
      .getPokemons()
      .pipe(map((response) => this.updateResultWithImage(response)))
      .subscribe((response) => {
        const { results, count } = response;
        const pages = this.calculateItemsPerPage(
          count,
          this.pagination().itemsPerPage
        );

        this.pagination.set({
          ...this.pagination(),
          items: count,
          pages: pages,
        });

        this.endItem = this.pagination().itemsPerPage;

        this.originalPokemosData = [...results];
        this.filteredPokemons = [...results];

        this.itemsToShow = this.getItemsPerPage(results);

        this.pokemons.set(this.itemsToShow);
      });
  }

  getItemsPerPage(pokemons: CustomPokemon[]): CustomPokemon[] {
    return pokemons.slice(this.startItem, this.endItem);
  }

  updateResultWithImage(response: PokeListResponse): PokeListTransformed {
    const updatedResults: CustomPokemon[] = response.results.map((result) => {
      const urlParts: string[] = result.url.split('/');
      const id: string = urlParts[urlParts.length - 2];
      return {
        ...result,
        id: id,
        image: getImageById(id),
        formattedName: getFormattedName(result.name),
      };
    });
    return {
      ...response,
      results: updatedResults,
    };
  }

  searchPokemon(searchTerm: string) {
    let searchTermToLowerCase = searchTerm.toLocaleLowerCase();
    this.filteredPokemons = this.originalPokemosData.filter((pokemon) =>
      pokemon.name.includes(searchTermToLowerCase)
    );
    let totalItems = this.filteredPokemons.length;

    this.resetPagination(totalItems);
    this.itemsToShow = this.getItemsPerPage(this.filteredPokemons);

    this.pokemons.set(this.itemsToShow);
  }

  handleAction(action: string) {
    this.updatePagination(action);
  }

  calculateItemsPerPage(totalItems: number, itemsPerPage: number) {
    return Math.ceil(totalItems / itemsPerPage);
  }

  resetPagination(totalItems: number) {
    this.pagination.update((prev) => ({
      ...prev,
      isFirstPage: true,
      isLastPage: totalItems <= this.pagination().itemsPerPage,
      pageNumber: 1,
      items: totalItems,
    }));

    this.startItem = 0;
    this.endItem = this.pagination().itemsPerPage;

    this.pagination().pages = this.calculateItemsPerPage(
      totalItems,
      this.pagination().itemsPerPage
    );
  }

  updatePagination(action: string) {
    this.pagination.update((prev) => ({
      ...prev,
      isLastPage: false,
      isFirstPage: false,
    }));

    if (action === 'next') {
      this.pagination.update((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));

      console.log(this.pagination().pageNumber);
      // se puede meter un multplicador para reutilizar funcion en ambos casos
      this.startItem = this.startItem + this.pagination().itemsPerPage;
      this.endItem = this.endItem + this.pagination().itemsPerPage;
      this.checkPageEdge(action);

      this.itemsToShow = this.getItemsPerPage(this.filteredPokemons);
      this.pokemons.set(this.itemsToShow);
      return;
    }

    this.pagination.update((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber - 1,
    }));
    this.startItem = this.startItem - this.pagination().itemsPerPage;
    this.endItem = this.endItem - this.pagination().itemsPerPage;
    this.checkPageEdge(action);

    this.itemsToShow = this.getItemsPerPage(this.filteredPokemons);
    this.pokemons.set(this.itemsToShow);
  }

  checkPageEdge(action: string): void {
    if (action === 'next') {
      this.pagination().isLastPage =
        this.pagination().pageNumber === this.pagination().pages;
    }

    this.pagination().isFirstPage = this.startItem === 0;
  }
}
