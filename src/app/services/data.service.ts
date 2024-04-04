import { Injectable, signal } from '@angular/core';
import { PokeListTransformed, PokePagination } from '../interfaces';

@Injectable({providedIn: 'root'})
export class dataService {

  public darkMode = signal<boolean>(false);
  setDarkMode(darkMode: boolean): void {
    this.darkMode.set(darkMode);
  }
  
  public listData = signal<PokeListTransformed | undefined>(undefined)
  public paginationData: PokePagination = {
    items: 0,
    itemsPerPage: 10,
    pageNumber: 1,
    pages: 0,
    isFirstPage: true,
    isLastPage: false,
  }
}
