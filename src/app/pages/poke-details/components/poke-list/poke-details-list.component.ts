import { Component, Input } from '@angular/core';
import { IconPokeball } from '../../../../../assets/icons/pokeball.component';
import { CommonModule } from '@angular/common';
import { Ability, Stat, Type } from '../../../../interfaces';

@Component({
  selector: 'poke-details-list',
  standalone: true,
  imports: [IconPokeball, CommonModule],
  templateUrl: './poke-details-list.component.html',
  styleUrl: './poke-details-list.component.css',
})
export class PokeDetailsListComponent {
  @Input() items!: Ability[] | Type[] | Stat[];
  @Input() title!: string;


  isStat(item: Ability | Type | Stat): item is Stat {
    return 'base_stat' in item;
  }

}
