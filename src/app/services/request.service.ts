import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { PokeDetails, PokeListResponse, errorMessage } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  public errorMessage?: errorMessage;

  public http = inject(HttpClient);
  public router = inject(Router);

  getPokemons(): Observable<PokeListResponse> {
    return this.http
      .get<PokeListResponse>(`${this.baseUrl}/pokemon?limit=-1`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getPokemonByName(name: string): Observable<PokeDetails> {
    return this.http
      .get<PokeDetails>(`${this.baseUrl}/pokemon/${name}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.router.navigate(['/not-found']);
      return throwError(
        () => new Error('error in source. Details: ' + error.error)
      );
    }
    this.errorMessage = { status: error.status, message: error.message };
    this.router.navigate(['/error']);
    return throwError(
      () => new Error('error in source. Details: ' + error.error)
    );
  }
}
