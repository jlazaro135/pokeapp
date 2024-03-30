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
});
