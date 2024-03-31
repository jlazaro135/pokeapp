import { Injectable, inject, signal } from '@angular/core';
import { CustomPokemon, PokeListResponse, PokeListTransformed, PokePagination } from '../../../interfaces';
import { getFormattedName, getImageById, scrollToTop } from '../../../helpers/helpers';
import { dataService } from '../../../services/data.service';

@Injectable({providedIn: 'root'})
export class PokeListService {
  public data = inject(dataService);

  public pokemons = signal<CustomPokemon[]>([]);
  public pagination = signal<PokePagination>(this.data.paginationData);
  public searchTerm = signal<string>('')
  public originalPokemosData: CustomPokemon[] = [];
  public filteredPokemons: CustomPokemon[] = [];
  public startItem: number = 0;
  public endItem!: number;
  public itemsToShow: CustomPokemon[] = [];

  loadData(response: PokeListTransformed | undefined, pagination: PokePagination) {
    if(!response) return

    const { results, count } = response;
    const { itemsPerPage } = pagination

    const pages = this.calculateItemsPerPage(
      count,
      itemsPerPage
    );

    this.pagination.set({
      ...pagination,
      items: count,
      pages: pages,
    });

    this.endItem = itemsPerPage;

    this.originalPokemosData = [...results];
    this.filteredPokemons = [...this.originalPokemosData];

    this.itemsToShow = this.getItemsPerPage(this.originalPokemosData);

    this.pokemons.set(this.itemsToShow);

  }

  setDataFromApi(response: PokeListTransformed){
    this.data.listData.set(response);
    this.setData(response)
  }

  setData(response: PokeListTransformed | undefined){
    this.loadData(
      response,
      this.pagination()
    );

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

  calculateItemsPerPage(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  getItemsPerPage(pokemons: CustomPokemon[]): CustomPokemon[] {
    return pokemons.slice(this.startItem, this.endItem);
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

      this.updateItems(action);
      this.checkPageEdge(action);

      this.itemsToShow = this.getItemsPerPage(this.filteredPokemons);
      this.pokemons.set(this.itemsToShow);
      return;
    }

    this.pagination.update((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber - 1,
    }));
    this.updateItems(action);
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

  updateItems(action: string) {
    let multipler = action === 'next' ? 1 : -1;

    this.startItem =
      this.startItem + this.pagination().itemsPerPage * multipler;
    this.endItem = this.endItem + this.pagination().itemsPerPage * multipler;
  }

  searchPokemon(searchTerm: string) {
    let searchTermToLowerCase = searchTerm.toLocaleLowerCase();
    this.filteredPokemons =
      this.originalPokemosData.filter((pokemon) =>
        pokemon.formattedName.includes(searchTermToLowerCase)
      );
    let totalItems = this.filteredPokemons.length;

    this.resetPagination(totalItems);
    this.itemsToShow = this.getItemsPerPage(
      this.filteredPokemons
    );

    this.pokemons.set(this.itemsToShow);
  }

  handleAction(action: string) {
    this.updatePagination(action);
  }

}
