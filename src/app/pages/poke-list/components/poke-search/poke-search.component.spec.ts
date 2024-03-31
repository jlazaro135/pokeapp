import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSearchComponent } from './poke-search.component';
import { debounceTime, pipe } from 'rxjs';

describe('PokeSearchComponent', () => {
  let component: PokeSearchComponent;
  let fixture: ComponentFixture<PokeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search term after debounce time', (done) => {
    // Arrange
    const searchTerm = 'search';
    let emittedSearchTerm: string;

    // Act
    component.debouncerSuscription = component.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        emittedSearchTerm = value;
        
        // Assert inside the subscription
        expect(emittedSearchTerm).toEqual(searchTerm);
        done();
      });

    component.onInput(searchTerm);
  });
});
