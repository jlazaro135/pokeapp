import { Component, inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-poke-details',
  standalone: true,
  imports: [],
  templateUrl: './poke-details.component.html',
  styleUrl: './poke-details.component.scss',
})
export default class PokeDetailsComponent {
  public pokemon: string = '';

  public request = inject(RequestService);
  public route = inject(ActivatedRoute);

  ngOnInit() {
    this.pokemon = this.route.snapshot.params['id'];

    this.request
      .getPokemonByName(this.pokemon)
      .pipe(
        map((response) => {
          const { abilities, types, name, id } = response;

          return {
            abilities,
            types,
            name,
            id,
          };
        })
      )
      .subscribe((pokemon) => {
        console.log(pokemon);
      });
  }
}
