import { HttpClientModule } from "@angular/common/http";
import { RequestService } from "./request.service";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { PokeDetails, PokeListResponse } from "../interfaces";
import { Router } from "@angular/router";

describe('RequestService', () => {
  let request: RequestService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    request = TestBed.inject(RequestService)
    router = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(request).toBeTruthy();
  });

  it('getPokemons should return an Observable', (done: DoneFn) => {
    const response: Observable<PokeListResponse> = request.getPokemons();
    expect(response instanceof Observable).toBeTruthy();
    done();
  });

  it('getPokemonsBtName should return an Observable', (done: DoneFn) => {
    const response: Observable<PokeDetails> = request.getPokemonByName('name');
    expect(response instanceof Observable).toBeTruthy();
    done();
  });
  
});
