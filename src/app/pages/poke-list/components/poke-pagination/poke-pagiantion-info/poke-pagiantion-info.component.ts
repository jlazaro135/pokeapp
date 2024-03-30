import { Component, Input } from '@angular/core';
import { PokePagination } from '../../../../../interfaces';

@Component({
  selector: 'poke-pagiantion-info',
  standalone: true,
  imports: [],
  templateUrl: './poke-pagiantion-info.component.html',
  styleUrl: './poke-pagiantion-info.component.css'
})
export class PokePagiantionInfoComponent {
  @Input() pagination!: PokePagination

  
}
