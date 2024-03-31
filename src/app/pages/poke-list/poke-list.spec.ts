import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import PokeListComponent from './poke-list.component';
import { PokeListService } from './services/poke-list.service';



describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;
  let pokeListService: PokeListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeListComponent, HttpClientModule],
      providers: [provideRouter(routes)]
    }).compileComponents();

    pokeListService = TestBed.inject(PokeListService);

    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set search term and call searchPokemon', () => {
    // Arrange
    const searchTerm: string = 'pikachu';
    spyOn(component.searchTerm, 'set');
    spyOn(pokeListService, 'searchPokemon');

    // Act
    component.searchPokemon(searchTerm);

    // Assert
    expect(component.searchTerm.set).toHaveBeenCalledWith(searchTerm);
    expect(pokeListService.searchPokemon).toHaveBeenCalledWith(searchTerm);
  });

  it('should call handleAction', () => {
    // Arrange
    const action: 'previous' | 'next' = 'next';
    spyOn(pokeListService, 'handleAction');

    // Act
    component.handleAction(action);

    // Assert
    expect(pokeListService.handleAction).toHaveBeenCalledWith(action);
  });

});
