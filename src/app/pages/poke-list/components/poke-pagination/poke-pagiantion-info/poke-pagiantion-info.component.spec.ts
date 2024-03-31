import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokePagiantionInfoComponent } from './poke-pagiantion-info.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../../app.routes';

describe('PokePagiantionInfoComponent', () => {
  let component: PokePagiantionInfoComponent;
  let fixture: ComponentFixture<PokePagiantionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokePagiantionInfoComponent],
      providers: [provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokePagiantionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
