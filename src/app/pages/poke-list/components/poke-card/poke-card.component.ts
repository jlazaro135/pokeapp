import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-card',
  standalone: true,
  imports: [],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.scss'
})
export class PokeCardComponent {
  @Input() name!: string;
  @Input() url!: string;

  

}
