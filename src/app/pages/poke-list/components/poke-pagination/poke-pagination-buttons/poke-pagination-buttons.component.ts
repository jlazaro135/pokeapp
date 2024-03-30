import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokePagination } from '../../../../../interfaces';

@Component({
  selector: 'poke-pagination-buttons',
  standalone: true,
  imports: [],
  templateUrl: './poke-pagination-buttons.component.html',
  styleUrl: './poke-pagination-buttons.component.css',
})
export class PokePaginationButtonsComponent {
  @Input() cardsToShow!: number;
  @Input() pagination!: PokePagination;
  @Output() actionToTake = new EventEmitter<string>();

  public isFirstPage!: boolean;
  public isLastPage!: boolean;

  OnInit() {
    this.isFirstPage = this.pagination.isFirstPage;
    this.isLastPage = this.pagination.isLastPage;
  }

  showCards(action: string) {
    this.actionToTake.emit(action);
  }
}
