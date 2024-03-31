import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDetailsListComponent } from './poke-details-list.component';

describe('PokeDetailsListComponent', () => {
  let component: PokeDetailsListComponent;
  let fixture: ComponentFixture<PokeDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeDetailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if the item isStat', () => {
    // Arrange
    const item = { base_stat: 100, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } };

    // Act
    const result = component.isStat(item);

    // Assert
    expect(result).toBe(true);
  });

});
