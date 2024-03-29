import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'poke-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.scss'
})
export class PokeCardComponent {
  @Input() name!: string;
  @Input() formattedName!: string;
  @Input() url!: string;



}
