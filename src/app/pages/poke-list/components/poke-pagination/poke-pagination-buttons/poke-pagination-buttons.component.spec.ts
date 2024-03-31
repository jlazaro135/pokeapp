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
});
