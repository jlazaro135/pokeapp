import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeDetails, PokeListResponse } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  public http = inject(HttpClient);

  getPokemons(): Observable<PokeListResponse> {
    return this.http.get<PokeListResponse>(`${this.baseUrl}/pokemon?limit=-1`);
  }

  getPokemonByName(name: string): Observable<PokeDetails> {
    return this.http.get<PokeDetails>(`${this.baseUrl}/pokemon/${name}`);
  }
}
