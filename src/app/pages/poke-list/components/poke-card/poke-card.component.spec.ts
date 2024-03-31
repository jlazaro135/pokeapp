import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCardComponent } from './poke-card.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('PokeCardComponent', () => {
  let component: PokeCardComponent;
  let fixture: ComponentFixture<PokeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeCardComponent],
      providers: [provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
