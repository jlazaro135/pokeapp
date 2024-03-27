import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonList } from '../interfaces/pokeListResponse.interface';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  public http = inject(HttpClient);

  getPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseUrl}/pokemon`);
  }
}
