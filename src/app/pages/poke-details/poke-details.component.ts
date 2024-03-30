import { Component, inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokeData } from '../../interfaces';
import { convertHeightToCm, convertWeightToKg, getFormattedName, getImageById } from '../../helpers/helpers';
import { CommonModule } from '@angular/common';
import { PokeDetailsListComponent } from './components/poke-list/poke-details-list.component';
import { delay, map } from 'rxjs';
import { PokeSpinnerComponent } from '../../shared/poke-spinner/poke-spinner.component';

@Component({
  selector: 'app-poke-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PokeDetailsListComponent,
    PokeSpinnerComponent
  ],
  templateUrl: './poke-details.component.html',
  styleUrl: './poke-details.component.css',
})
export default class PokeDetailsComponent {
  public pokeName: string = '';
  public pokeData!: PokeData;

  public request = inject(RequestService);
  public route = inject(ActivatedRoute);

  ngOnInit() {
    this.pokeName = this.route.snapshot.params['name'];

    this.request.getPokemonByName(this.pokeName)
    .pipe(
      map((response) => {

       let abilities = response.abilities.map((ability) => {
        return {
          ...ability,
          item: ability.ability
        }
       })

       let types = response.types.map((type) => {
        return {
          ...type,
          item: type.type
        }
       })

       let stats = response.stats.map((stat) => {
        return {
          ...stat,
          item: stat.stat
        }
       })

       return {
        ...response,
        abilities,
        types,
        stats
       }
      }),
      delay(1000)
    )
    .subscribe((response) => {
      const { abilities, types, name, id, base_experience, weight, height, stats } =
        response;

      this.pokeData = {
        abilities,
        types,
        name,
        id,
        base_experience,
        weight: convertWeightToKg(weight),
        height: convertHeightToCm(height),
        image: getImageById(id),
        formattedName: getFormattedName(name),
        stats
      };

    });
  }
}
