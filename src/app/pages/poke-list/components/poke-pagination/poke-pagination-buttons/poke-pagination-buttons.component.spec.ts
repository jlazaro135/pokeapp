import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokePaginationComponent } from './poke-pagination-buttons.component';

describe('PokePaginationComponent', () => {
  let component: PokePaginationComponent;
  let fixture: ComponentFixture<PokePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokePaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
