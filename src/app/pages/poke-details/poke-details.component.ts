import { Component, inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { PokeData } from '../../interfaces';
import { getImageById } from '../../helpers/helpers';

@Component({
  selector: 'app-poke-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './poke-details.component.html',
  styleUrl: './poke-details.component.scss',
})
export default class PokeDetailsComponent {
  public pokeName: string = '';
  public pokeData!: PokeData;

  public request = inject(RequestService);
  public route = inject(ActivatedRoute);

  ngOnInit() {
    this.pokeName = this.route.snapshot.params['name'];

    this.request
      .getPokemonByName(this.pokeName
      )
      .subscribe((response) => {
        const { abilities, types, name, id , base_experience, weight, height } = response;

        this.pokeData = { abilities, types, name, id, base_experience, weight, height, image: getImageById(id) }
      });
  }
}
