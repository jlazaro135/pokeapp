import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeEmptyListComponent } from './poke-empty-list.component';

describe('PokeEmptyListComponent', () => {
  let component: PokeEmptyListComponent;
  let fixture: ComponentFixture<PokeEmptyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeEmptyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeEmptyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
