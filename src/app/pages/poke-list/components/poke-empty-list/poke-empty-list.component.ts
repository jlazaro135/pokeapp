import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-empty-list',
  standalone: true,
  imports: [],
  templateUrl: './poke-empty-list.component.html',
  styleUrl: './poke-empty-list.component.css'
})
export class PokeEmptyListComponent {
  @Input() searchTerm: string = '';

}
