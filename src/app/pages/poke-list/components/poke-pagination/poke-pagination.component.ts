import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PokePagination } from '../../../../interfaces';



@Component({
  selector: 'poke-pagination',
  standalone: true,
  imports: [],
  templateUrl: './poke-pagination.component.html',
  styleUrl: './poke-pagination.component.scss',
})
export class PokePaginationComponent {
  @Input() cardsToShow!: number;
  @Input() pagination!: PokePagination;
  @Output() actionToTake = new EventEmitter<string>();


  public isFirstPage!: boolean;
  public isLastPage!: boolean;

  OnInit(){

    
    this.isFirstPage = this.pagination.isFirstPage;
    this.isLastPage = this.pagination.isLastPage;
  }

  showCards(action: string) {
    this.actionToTake.emit(action);
  }



}
