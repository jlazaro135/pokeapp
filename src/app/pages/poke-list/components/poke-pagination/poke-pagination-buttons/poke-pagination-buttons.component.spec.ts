import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokePaginationButtonsComponent } from './poke-pagination-buttons.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../../app.routes';

describe('PokePaginationButtonsComponent', () => {
  let component: PokePaginationButtonsComponent;
  let fixture: ComponentFixture<PokePaginationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokePaginationButtonsComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(PokePaginationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct action when showCards is called', () => {
    // Arrange
    const action = 'next';
    let emittedAction: 'next' | 'previous' = 'next';
    component.actionToTake.subscribe((value: 'next' | 'previous') => (emittedAction = value));

    // Act
    component.showCards(action);

    // Assert
    expect(emittedAction).toEqual(action);
  });
});
