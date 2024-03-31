import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PokeListService } from './poke-list.service';

describe('PokeListService', () => {
  let pokeListService: PokeListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    pokeListService = TestBed.inject(PokeListService);
  });

  it('should create', () => {
    expect(pokeListService).toBeTruthy();
  });
});
